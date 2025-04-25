import mongoose from "mongoose";
import { transporter } from "../config/nodemailer.js";

import coachModel from "../models/coachModel.js";
import userModel from "../models/userModel.js";
import academyModel from "../models/academyModel.js";
import groundModel from "../models/groundModel.js";


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


export const countBooking = async (req, res) => {
  try {
    const users = await userModel.find();
    const approvedCoaches = await coachModel.find({ isApprove: true });
    const approvedAcademies = await academyModel.find({ isApprove: true });
    const approvedGrounds = await groundModel.find({ verified: true });



    let coachesCount = 0;
    let groundsCount = 0;
    let academiesCount = 0;

    const coachesAmount = approvedCoaches.length ;
    const groundsAmount = approvedGrounds.length ; // Sample rate per booking
    const academiesAmount = approvedAcademies.length; // Sample rate per booking

    // Loop through all users and tally booking stats
    users.forEach(user => {
      if (user.coachBooking?.length) {
        coachesCount += user.coachBooking.length;
         
      }

      if (user.groundBookings?.length) {
        groundsCount += user.groundBookings.length;
        
      }

      if (user.academicsBooking?.length) {
        academiesCount += user.academicsBooking.length;
        
      }
    });

    res.json({
      coachesCount,
      groundsCount,
      academiesCount,
      coachesAmount,
      groundsAmount,
      academiesAmount,
    });

  } catch (error) {
    console.error("Error fetching booking stats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const getAdminDashboardData = async (req, res) => {
  try {
    // Find the most popular coaches by the number of bookings
    const popularCoaches = await userModel.aggregate([
      { $unwind: "$coachBooking" },
      { $group: { _id: "$coachBooking.coachId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Top 5 most popular coaches
      {
        $lookup: {
          from: "coaches", // assuming your collection name is 'coaches'
          localField: "_id",
          foreignField: "_id",
          as: "coach",
        },
      },
      { $unwind: "$coach" },
      { $project: { _id: 0, coachId: "$coach._id", fullName: "$coach.personalInfo.fullName",profile : "$coach.personalInfo.profile" ,bookings: "$count" } },
    ]);

    // Find the most popular grounds by the number of bookings
    const popularGrounds = await userModel.aggregate([
      { $unwind: "$groundBookings" },
      { $group: { _id: "$groundBookings.groundId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Top 5 most popular grounds
      {
        $lookup: {
          from: "grounds", // assuming your collection name is 'grounds'
          localField: "_id",
          foreignField: "_id",
          as: "ground",
        },
      },
      { $unwind: "$ground" },
      { $project: { _id: 0, groundId: "$ground._id", name: "$ground.name",image:"$ground.image", bookings: "$count" } },
    ]);

    // Find the most popular academies by the number of bookings
    const popularAcademies = await userModel.aggregate([
      { $unwind: "$academicsBooking" },
      { $group: { _id: "$academicsBooking.academyId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }, // Top 5 most popular academies
      {
        $lookup: {
          from: "academies", // assuming your collection name is 'academies'
          localField: "_id",
          foreignField: "_id",
          as: "academy",
        },
      },
      { $unwind: "$academy" },
      { $project: { _id: 0, academyId: "$academy._id", name: "$academy.academyBasicDetails.academyName",image:"$acdemy.academyBasicDetails.picture", bookings: "$count" } },
    ]);

    // Send data to the frontend
    res.json({success:true,
      popularCoaches,
      popularGrounds,
      popularAcademies,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};