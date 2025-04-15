import  {transporter} from "../config/nodemailer.js";
import clientModel from "../models/clientModel.js";
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
            from: process.env.ADMIN_EMAIL,
            to: user.contactDetails.email,
            subject: 'Your Coaching Application Has Been Approved!',
            text: `Dear ${user.fullName},
          
          Congratulations! Your application has been approved by our admin team.
          
          Welcome aboard! We're excited to have you join our platform. We believe you’ll make a great impact as a coach.
          
          To complete your registration and verify your account, please use the following One-Time Password (OTP):
          
          OTP: ${otp}
          
          Please enter this code on the verification page to activate your account.
          
          If you have any questions, feel free to reach out to us.
          
          Best regards,  
          The Coaching Platform Team`
          };
          
        
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
            from: process.env.ADMIN_EMAIL,
            to: email,
            subject: "Update on Your Coaching Application",
            text: `Dear Applicant,
          
          Thank you for your interest in joining our coaching platform.
          
          After careful review of your application, we regret to inform you that it does not meet our current qualification criteria. We appreciate the time and effort you invested in the process.
          
          We encourage you to continue gaining experience and enhancing your skills, and we welcome you to reapply in the future when you meet the necessary qualifications.
          
          Thank you again for your interest in our platform.
          
          Best regards,  
          The Coaching Platform Team`
          };
          
        await transporter.sendMail(mailOptions) ; 
        return res.json({success:true,message:"Rejected the coach successfully!"})

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}

export const approveBycoach = async (req, res) => {
    try {
      const {clientId} = req.params;
      console.log(clientId)
      const client = await clientModel.findById(clientId);
      if (!client) {
        return res.json({ success: false, message: "User not found!" })
      }
      const otp = Math.floor(Math.random() * 900000 + 100000);
      client.otp = otp;
      client.isApprove = true;
      await client.save();
  
      const coach = await coachModel.findById(client.coachId);
  
      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: client.email,
        subject: 'Your Coaching Request Has Been Approved!',
        text: `Dear ${client.fullName},
      
        Good news! Your coaching request has been approved by ${coach.personalInfo.fullName}.
      
        To proceed with the session, please use the following One-Time Password (OTP) to verify your identity:
      
        OTP: ${otp}
      
        Enter this code on the verification page to confirm your booking.
      
        If you have any questions or need to reschedule, feel free to contact your coach directly or reach out to our support team.
      
        Thank you for using our platform. We wish you the best on your coaching journey!
      
        Warm regards,  
        The Coaching Platform Team`
      };
      
      await transporter.sendMail(mailOptions)
      return res.json({ success: true, message: `Approved ` }, client.otp);
    } catch (error) {
      return res.json({ success: false, message: error.message })
    }
  }
  
  export const rejectByCoach = async (req, res) => {
    try {
  
      const {clientId}= req.params
      const client = await clientModel.findById(clientId)
      console.log(client)
  
      const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: client.email,
        subject: 'Update on Your Coaching Request',
        text: `Dear ${client.fullName},
      
      Thank you for your interest in booking a coaching session through our platform.
      
      After reviewing your request, your selected coach has decided not to proceed with the session at this time. This could be due to scheduling conflicts, availability, or other preferences.
      
      We truly appreciate your effort in reaching out, and we encourage you to explore other coaches available on our platform who might be a better fit for your goals.
      
      Please don’t hesitate to try again — we're here to support your journey.
      
      Warm regards,  
      The Coaching Platform Team`
      };
      
      await transporter.sendMail(mailOptions)
  
      await clientModel.findByIdAndDelete(clientId);
  
      
      return res.json({ success: true, message: "Rejected the coach successfully!" })
  
    } catch (error) {
      return res.json({ success: false, message: error.message })
    }
  }