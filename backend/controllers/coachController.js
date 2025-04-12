import coachModel from "../models/coachModel.js";
import { v2 as cloudinary } from 'cloudinary';
import upload from "../middleware/multer.js";
import moment from 'moment';
import { transporter } from "../config/nodemailer.js";
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

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
      resource_type: "image"
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
      subject: 'A coach Registered ',
      text: 'Approving his/her application'
    }

    await transporter.sendMail(mailOptions);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    // console.log(token)

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite:  "None" ,
      maxAge: 7 * 24 * 3600 * 1000
    })

    return res.json({
      success: true,
      message: "Registration successfully completed. Waiting for approval message!",
      token
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const editDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, files } = req;


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
        const profileResult = await cloudinary.uploader.upload(files.profile[0].path, {
          resource_type: "image"
        });
        updateData.personalInfo.profile = profileResult.secure_url;
      }


      if (files.NIC_photo && files.NIC_photo[0]) {
        const nicResult = await cloudinary.uploader.upload(files.NIC_photo[0].path, {
          resource_type: "image"
        });
        updateData.personalInfo.NIC_photo = nicResult.secure_url;
      }


      if (files.qualifications_photo && files.qualifications_photo[0]) {
        const qualResult = await cloudinary.uploader.upload(files.qualifications_photo[0].path, {
          resource_type: "image"
        });
        updateData.coachSelection.qualifications_photo = qualResult.secure_url;
      }
    }


    const updatedCoach = await coachModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return res.json({
      success: true,
      message: "Coach details updated successfully",
      data: updatedCoach
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }

};


export const checkOTP = async (req, res) => {
  try {
    
    if (!req.body.email || !req.body.otp) {
      return res.json({ success: false, message: "Email and OTP are required!" })
    }
    const user = await coachModel.findById(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: "This email is not registered! Enter the registered email." })
    }
    if (req.body.otp === '' || user.otp !== (String)(req.body.otp)) {
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
            unit_amount: 5000, // $50.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      
      success_url: `http://localhost:5173/verify?success=true&user._id=${user._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&user._id=${user._id}`,
      metadata: {
        orderType: "registration",
        userId: user._id.toString(),
      },
    });
    
    
    return res.json({ success: true, message: "Continue your payment processing!" ,session_url: session.url })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export const getCoaches = async (req,res) => {
  try {
    const users = await coachModel.find({});
    
    return res.json({success:true,message:"Fetch coaches successfully!",users})
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}

export const getCoach = async (req,res) => {
  try {
    const coach = await coachModel.findById(req.body.userId)
    
    if(!coach){
      return res.json({success:false,message:"User not found!"})
    }
    console.log(coach)
    return res.json({success:true,message:"Fetch coaches successfully!",coach})
  } catch (error) {
    return res.json({success:false,message:error.message})
    
  }
}