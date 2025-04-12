import  {transporters} from "../config/nodemailer.js";
import coachModel from "../models/coachModel.js";


export const approveByAdmin = async (req,res) => {
    try {
        const {email} = req.body;
        console.log(email);
        if(!email){
            return res.json({success:false,message:"Email is required!"})
        }
        const user = await coachModel.findOne({ "contactDetails.email": email});
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
        
        await transporters.sendMail(mailOptions);
        return res.json({success:true,message: `Approved `},otp);
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}