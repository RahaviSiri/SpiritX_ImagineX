import mongoose from "mongoose";
import { transporter } from "../config/nodemailer.js";

import coachModel from "../models/coachModel.js";
import userModel from "../models/userModel.js";


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
    return res.json({ success: true, message: `Approved ` }, user.otp);
  } catch (error) {
    return res.json({ success: false, message: error.message })
  }
}

export const rejectByAdmin = async (req, res) => {
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

    await transporter.sendMail(mailOptions);
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
      text: `Dear ${client.fullName},\n\nYour request has been approved by ${coach.personalInfo.fullName}.\n\nYour OTP is: ${otp}\n\nThank you!`
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
      text: `Dear ${client.fullName},\n\nUnfortunately, your coach has rejected the session.\n\nPlease try booking another coach.\n\nThanks!`
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
