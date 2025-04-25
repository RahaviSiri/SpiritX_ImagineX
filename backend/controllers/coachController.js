import coachModel from "../models/coachModel.js";
import { v2 as cloudinary } from 'cloudinary';
import { transporter } from "../config/nodemailer.js";
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from "mongoose";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const registerCoach = async (req, res) => {
  try {
    const { body, files } = req;
    dotenv.config();


    if (!body) {
      return res.json({ success: false, message: "Form data is required!" });
    }


    if (!files || !files.profile || !files.NIC_photo || !files.qualifications_photo) {
      return res.json({
        success: false,
        message: "All required files (profile, NIC_photo, qualifications_photo) must be uploaded!"
      });
    }


    if (!files.profile[0] || !files.NIC_photo[0] || !files.qualifications_photo[0]) {
      return res.json({
        success: false,
        message: "One or more required files are missing"
      });
    }


    const profile = await cloudinary.uploader.upload(files.profile[0].path, {
      resource_type: "image"
    });

    const NIC_photo = await cloudinary.uploader.upload(files.NIC_photo[0].path, {
      resource_type: "image"
    });

    const qualifications_photo = await cloudinary.uploader.upload(files.qualifications_photo[0].path, {
      resource_type: "raw"
    });


    if (body.DOB > '2005-01-01') {
      return res.json({ success: false, message: 'You are not qualified for applying as a coach.' });
    }


    const user = await new coachModel({
      personalInfo: {
        fullName: body.fullName,
        profile: profile.secure_url,
        DOB: body.DOB,
        gender: body.gender,
        NIC: body.NIC,
        NIC_photo: NIC_photo.secure_url,
      },
      contactDetails: {
        contactNo: body.contactNo,
        HomeTP: body.HomeTP,
        whatsapp: body.whatsapp,
        email: body.email,
      },
      Address: {
        Line1: body.Line1,
        Line2: body.Line2,
        city: body.city,
        district: body.district,
      },
      coachSelection: {
        selectionType: body.selectionType,
        school_Academics: body.school_Academics,
        sport: body.sport,
        qualifications: body.qualifications,
        qualifications_photo: qualifications_photo.secure_url,
      },
    });

    await user.save();

    const mailOptions = {
      from: user.contactDetails.email,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Coach Registration Request',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7; color: #333;">
          <h2 style="color: #2c3e50;">🎓 New Coach Registration</h2>
          <p>Hello Admin,</p>
    
          <p>
            A new coach has submitted a registration request and is awaiting your approval.
          </p>
    
          <h3 style="color: #34495e;">Coach Details:</h3>
          <ul style="line-height: 1.6;">
            <li><strong>Name:</strong> ${user.personalInfo?.fullName || 'N/A'}</li>
            <li><strong>Email:</strong> ${user.contactDetails.email}</li>
            <li><strong>Phone:</strong> ${user.contactDetails.contactNo || 'N/A'}</li>
            <li><strong>City:</strong> ${user.Address?.city || 'N/A'}</li>
            <li><strong>District:</strong> ${user.Address?.district || 'N/A'}</li>
          </ul>
    
          <p>Please review and approve or reject their application from the admin dashboard.</p>
    
          <p style="margin-top: 30px;">Thanks,<br/>Your Coaching Platform</p>
        </div>
      `
    };
    

    await transporter.sendMail(mailOptions);

    const Ctoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })


    res.cookie('Ctoken', Ctoken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 3600 * 1000
    })

    return res.json({
      success: true,
      message: "Registration successfully completed. Waiting for approval message!",
      Ctoken
    });
  } catch (error) {

    return res.json({ success: false, message: error.message });
  }
};

export const editDetails = async (req, res) => {
  try {
    const id = req.body.userId;
    const { body, files } = req;

    // Validate required fields
    if (!body.fullName || !body.contactNo) {
      return res.json({ success: false, message: "Full name and contact number are required" });
    }

    const existingCoach = await coachModel.findById(id);
    if (!existingCoach) {
      return res.json({ success: false, message: "Coach not found" });
    }

    const updateData = {
      personalInfo: {
        ...existingCoach.personalInfo,
        fullName: body.fullName || existingCoach.personalInfo.fullName,
        DOB: body.DOB || existingCoach.personalInfo.DOB,
        gender: body.gender || existingCoach.personalInfo.gender,
        NIC: body.NIC || existingCoach.personalInfo.NIC,
      },
      contactDetails: {
        ...existingCoach.contactDetails,
        contactNo: body.contactNo || existingCoach.contactDetails.contactNo,
        HomeTP: body.HomeTP || existingCoach.contactDetails.HomeTP,
        whatsapp: body.whatsapp || existingCoach.contactDetails.whatsapp,
        email: body.email || existingCoach.contactDetails.email,
      },
      Address: {
        ...existingCoach.Address,
        Line1: body.Line1 || existingCoach.Address.Line1,
        Line2: body.Line2 || existingCoach.Address.Line2,
        city: body.city || existingCoach.Address.city,
        district: body.district || existingCoach.Address.district,
      },
      coachSelection: {
        ...existingCoach.coachSelection,
        selectionType: body.selectionType || existingCoach.coachSelection.selectionType,
        school_Academics: body.school_Academics || existingCoach.coachSelection.school_Academics,
        sport: body.sport || existingCoach.coachSelection.sport,
        qualifications: body.qualifications || existingCoach.coachSelection.qualifications,
      }
    };

    if (files) {
      if (files.profile && files.profile[0]) {
        const profileResult = await cloudinary.uploader.upload(files.profile[0].path, { resource_type: "image" });
        updateData.personalInfo.profile = profileResult.secure_url;
      }

      if (files.NIC_photo && files.NIC_photo[0]) {
        const nicResult = await cloudinary.uploader.upload(files.NIC_photo[0].path, { resource_type: "image" });
        updateData.personalInfo.NIC_photo = nicResult.secure_url;
      }

      if (files.qualifications_photo && files.qualifications_photo[0]) {
        const qualResult = await cloudinary.uploader.upload(files.qualifications_photo[0].path, { resource_type: "image" });
        updateData.coachSelection.qualifications_photo = qualResult.secure_url;
      }
    }

    const updatedCoach = await coachModel.findByIdAndUpdate(id, updateData, { new: true });

    return res.json({
      success: true,
      message: "Coach details updated successfully",
      data: updatedCoach
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deleteCoach = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ success: false, message: "Coach ID is required!" });
    }
    const coach = await coachModel.findById(id);
    if (!coach) {
      return res.json({ success: false, message: "Coach not found!" });
    }
    await coachModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Coach deleted successfully!" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

export const checkOTP = async (req, res) => {
  try {
    const { email, otp ,id } = req.body;
    if (!email || !otp) {
      return res.json({ success: false, message: "Email and OTP are required!" })
    }
    const coach = await coachModel.findById(id);
    if (!coach) {
      return res.json({ success: false, message: "This email is not registered! Enter the registered email." })
    }
    if (otp === '' || coach.otp !== (String)(otp)) {
      return res.json({ success: false, message: "OTP is invalid! Enter the valid OTP." })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Coach Registration Fee',
              description: 'One-time registration payment'
            },
            unit_amount: 500000, // $50.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',

      success_url: `http://localhost:5173/verify?success=true&userId=${coach._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&userId=${coach._id}`,
      metadata: {
        orderType: "registration",
        userId: coach._id.toString(),
      },
    });
    return res.json({ success: true, message: "Continue your payment processing!", session_url: session.url })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getCoaches = async (req, res) => {
  try {
    const users = await coachModel.find({});
    if (!users) {
      return res.json({ success: false, message: "Users not found!" })
    }

    return res.json({ success: true, message: "Fetch coaches successfully!", users })
  } catch (error) {
    return res.json({ success: false, message: error.message })

  }
}

export const getCoach = async (req, res) => {
  try {
    const coach = await coachModel.findById(req.body.userId)

    if (!coach) {
      return res.json({ success: false, message: "User not found!" })
    }

    return res.json({ success: true, message: "Fetch coaches successfully!", coach })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: error.message })

  }
}

export const getCoachById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log("Received ID:", id); // Log the ID

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    // Just return something simple to test the route
    // return res.json({ success: true, message: "Route works", receivedId: id });

    // Once that works, uncomment the below code

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.json({ success: false, message: "Invalid coach ID format" });
    }

    const coach = await coachModel.findById(id);

    if (!coach) {
      return res.json({ success: false, message: "Coach not found!" });
    }

    return res.json({ success: true, message: "Fetch coach successfully!", coach });

  } catch (error) {
    console.error("Server error:", error); // Log the full error
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { success, userId } = req.body;

    if (success === 'true') {
      await coachModel.findByIdAndUpdate(userId, { isPayment: true })
      return res.json({ success: true, message: "Paid successfully" })
    }
    else {
      await coachModel.findByIdAndDelete(userId)
      return res.json({ success: false, message: "Not paid yet." })

    }
    return res.json({success:true})
  } catch (error) {
    return res.json({ success: false, message: error.message })

  }

}

