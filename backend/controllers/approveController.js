import  {transporter} from "../config/nodemailer.js";
import coachModel from "../models/coachModel.js";


export const approveByAdmin = async (req,res) => {
    try {
        
        const user = await coachModel.findById(req.body.userId);
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        const otp = Math.floor(Math.random() * 900000 + 100000);
        user.otp = otp;
        user.isApprove = true;
        await user.save();

        
         
        const mailOptions = {
            from:process.env.ADMIN_EMAIL,
            to:user.contactDetails.email,
            subject:'You are approving by admin!',
            text:`Welcome to our web.Hope to become a great coach through our website. Your otp is ${otp}`
        }
        
        await transporter.sendMail(mailOptions);
        return res.json({success:true,message: `Approved `},user.otp);
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export const rejectByAdmin = async (req,res) => {
    try {
    
        
        await coachModel.findByIdAndDelete(req.body.userId)
        

        const mailOptions = {
            from:process.env.ADMIN_EMAIL,
            to:email,
            subject:"Rejected your application",
            text:"Sorry for the inconvinence! We are expecting more qualifications to apply a coach through our web page. Please try again later! Thank your for approaching our website."
        }
        await transporter.sendMail(mailOptions) ; 
        return res.json({success:true,message:"Rejected the coach successfully!"})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}