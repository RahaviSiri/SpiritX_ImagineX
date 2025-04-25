import mongoose from "mongoose";
import { transporter } from "../config/nodemailer.js";

import coachModel from "../models/coachModel.js";
import userModel from "../models/userModel.js";
import academyModel from "../models/academyModel.js";


export const approveByAdmin = async (req, res) => {
  try {

    const user = await coachModel.findById(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "User not found!" })
    }
    const otp = Math.floor(Math.random() * 900000 + 100000);
    user.otp = otp;
    user.isApprove = true;
    await user.save();



    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.contactDetails.email,
      subject: '🎉 Welcome to the Coaching Platform – Your Application is Approved!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #4CAF50;">Hi ${user.personalInfo.fullName},</h2>
          
          <p>🎉 <strong>Great news!</strong> Your coaching application has been <strong>approved</strong> by our admin team.</p>
          
          <p>We're thrilled to welcome you to our community of passionate and dedicated coaches. Your journey with us begins now, and we’re confident you’ll inspire and empower many lives.</p>
          
          <p style="font-size: 16px; margin-top: 20px;">
            <strong>To complete your registration, please verify your account using the One-Time Password (OTP) below:</strong>
          </p>
          
          <div style="font-size: 20px; font-weight: bold; background: #f0f0f0; padding: 15px; border-radius: 8px; display: inline-block; margin: 10px 0;">
            🔐 OTP: ${otp}
          </div>
          
          <p>Please enter this code on the verification page to activate your account.</p>
          
          <p>If you have any questions or need assistance, don’t hesitate to reach out. We’re here to help!</p>
          
          <p style="margin-top: 30px;">Warm regards,<br/>
          <strong>The Coaching Platform Team</strong></p>
        </div>
      `
    };
    


    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: `Approved ` }, user.otp);
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const rejectByAdmin = async (req, res) => {
  try {
    const user = await coachModel.findById(req.body.userId);
     if(!user) {
      return res.json({success:false,message:"user not found"})
     }

     user.isReject = true
     await user.save();
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.contactDetails.email,
      subject: "Update on Your Coaching Application",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
          <h2 style="color: #D32F2F;">Dear Applicant,</h2>
    
          <p>Thank you for your interest in joining our <strong>Coaching Platform</strong>.</p>
    
          <p>After a thorough review of your application, we regret to inform you that it does not currently meet our qualification criteria.</p>
    
          <p>We truly appreciate the time, effort, and enthusiasm you brought to the application process. While we are unable to move forward at this time, we encourage you to continue building your experience and strengthening your skills.</p>
    
          <p>We welcome you to reapply in the future when you feel you meet the necessary qualifications, and we would be glad to reconsider your application.</p>
    
          <p>Thank you once again for your interest in being a part of our platform.</p>
    
          <p style="margin-top: 30px;">Sincerely,<br/>
          <strong>The Coaching Platform Team</strong></p>
        </div>
      `
    };
    

    await transporter.sendMail(mailOptions);
    // await coachModel.findByIdAndDelete(req.body.userId)
    return res.json({ success: true, message: "Rejected the coach successfully!" })

  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const approveByCoach = async (req, res) => {
  try {
    const { userId, bookingId } = req.params;

    const client = await userModel.findById(userId);
    if (!client) {
      return res.json({ success: false, message: "User not found!" });
    }

    const booking = client.coachBooking.id(bookingId);
    console.log(booking)
    if (!booking) {
      return res.json({ success: false, message: "Booking not found!" });
    }

    const otp = Math.floor(Math.random() * 900000 + 100000);
    booking.otp = otp;
    booking.isApprove = true;
    await client.save();

    const coach = await coachModel.findById(booking.coachId);
    if (!coach) {
      return res.json({ success: false, message: "Coach not found!" });
    }

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: booking.email,
      subject: 'Your Coaching Request Has Been Approved!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
          <h2 style="color: #2E7D32;">Hello ${client.coachBooking.fullName},</h2>
    
          <p>Great news! Your coaching request has been <strong>approved</strong> by <strong>${coach.personalInfo.fullName}</strong>.</p>
    
          <p>Please use the following One-Time Password (OTP) to proceed:</p>
    
          <div style="background-color: #f2f2f2; padding: 15px; border-radius: 8px; font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0;">
            OTP: ${otp}
          </div>
    
          <p>If you have any questions or need further assistance, feel free to contact us anytime.</p>
    
          <p style="margin-top: 30px;">Thank you and best of luck with your session!<br/>
          <strong>The Coaching Platform Team</strong></p>
        </div>
      `
    };
    

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Approved", otp });

  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const rejectByCoach = async (req, res) => {
  try {
    const { userId, bookingId } = req.params;

    const client = await userModel.findById(userId);
    if (!client) {
      return res.json({ success: false, message: "User not found!" });
    }

    const booking = client.coachBooking.id(bookingId);
    if (!booking) {
      return res.json({ success: false, message: "Booking not found!" });
    }

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: booking.email,
      subject: 'Update on Your Coaching Request',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; line-height: 1.6;">
          <h2 style="color: #D32F2F;">Hello ${client.coachBooking.fullName},</h2>
    
          <p>We regret to inform you that your coaching request has been <strong>rejected</strong> by the coach.</p>
    
          <p>We understand this may be disappointing, but don't worry — there are many other qualified coaches available for booking.</p>
    
          <p>You can browse our directory and submit a request to another coach at your convenience.</p>
    
          <p style="margin-top: 30px;">Thank you for using our platform,<br/>
          <strong>The Coaching Platform Team</strong></p>
        </div>
      `
    };
    

    await transporter.sendMail(mailOptions);

    // Remove booking
    booking.deleteOne(); // remove that specific booking
    await client.save();

    return res.json({ success: true, message: "Rejected and booking removed." });

  } catch (error) {
    console.error("Reject error:", error);
    return res.json({ success: false, message: error.message });
  }
};


// Approval of academies for admin
export const approveAcademyByAdmin = async (req, res) => {
  try {
    const academy = await academyModel.findById(req.body.academyId);
    if (!academy) {
      return res.json({ success: false, message: "Academy not found!" });
    }

    const otp = Math.floor(Math.random() * 900000 + 100000);
    academy.otp = otp;
    academy.isApprove = true;
    await academy.save();

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: academy.contact.email,
      subject: '🎉 Your Academy Has Been Approved!',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #4CAF50;">Hi ${academy.academyName},</h2>
          <p>🎉 <strong>Great news!</strong> Your academy has been <strong>approved</strong> by our admin team.</p>
          <p>Please use the OTP below to complete the verification process:</p>
          <div style="font-size: 20px; font-weight: bold; background: #f0f0f0; padding: 15px; border-radius: 8px;">
            🔐 OTP: ${otp}
          </div>
          <p>Welcome aboard! If you have questions, feel free to reach out anytime.</p>
          <p style="margin-top: 30px;">Best,<br/><strong>The Coaching Platform Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Academy approved successfully", otp });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const rejectAcademyByAdmin = async (req, res) => {
  try {
    const academy = await academyModel.findById(req.body.academyId);
    if (!academy) {
      return res.json({ success: false, message: "Academy not found!" });
    }

    academy.isReject = true;
    await academy.save();

    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: academy.contact.email,
      subject: "Update on Your Academy Application",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
          <h2 style="color: #D32F2F;">Dear ${academy.academyName},</h2>
          <p>Thank you for applying to our platform. After review, we regret to inform you that your academy does not meet our current approval criteria.</p>
          <p>You are welcome to reapply in the future with updated information. We appreciate your interest and effort!</p>
          <p style="margin-top: 30px;">Warm regards,<br/><strong>The Coaching Platform Team</strong></p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Academy rejected successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

