import User from "../models/userModel.js";
import Academy from "../models/academyModel.js";
import { v2 as cloudinary } from 'cloudinary';
import upload from "../middleware/multer.js";
// import moment from 'moment';
// import { transporter } from "../config/nodemailer.js";
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import academicsModel from "../models/academicsModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Add an academy to main page
export const addAcademy = async (req, res) => {
    try {
        const { body, files } = req;
        dotenv.config();
    
        if (!body) {
          return res.json({ success: false, message: "Form data is required!" });
        }


        const requiredFiles = ["academyLogo", "NIC_photo", "proof", "certificate", "picture"];

        const missingFile = requiredFiles.find(
          (field) => !files?.[field] || !files[field][0]
        );
        
        if (missingFile) {
          return res.json({
            success: false,
            message: `Missing required file: ${missingFile}`
          });
        }


        const academyLogo = await cloudinary.uploader.upload(files.academyLogo[0].path, {
          resource_type: "image"
        });
        const NIC_photo = await cloudinary.uploader.upload(files.NIC_photo[0].path, {
          resource_type: "image"
        });
        const picture = await cloudinary.uploader.upload(files.picture[0].path, {
          resource_type: "image"
        });
        const proof = await cloudinary.uploader.upload(files.proof[0].path, {
          resource_type: "raw"  
        });
        const certificate = await cloudinary.uploader.upload(files.certificate[0].path, {
          resource_type: "raw"
        });


        const newAcademy = new academicsModel({
          academyBasicDetails: {
            academyName: body.academyName,
            academyLogo: academyLogo.secure_url,
            picture: body.picture,
            sportType: body.sportType,
            shortdescription: body.shortDescription,
            description: body.description,
            duration: body.duration,
            instructors: body.instructors,
            feeAmount: body.feeAmount,
            mode: body.mode,
            isFlexible: body.isFlexible === "true",
            startDate: body.startDate ? new Date(body.startDate) : null,
          },
          Address : {
            Line1 : body.Line1,
            Line2 : body.Line2,
            city : body.city,
            district : body.district
          },
          contactDetails : {
            contactNo : body.contactNo,
            HomeTP : body.HomeTP,
            whatsapp : body.whatsapp,
            email : body.email
          },
          ownerInfo : {
            fullName : body.fullName,
            profile : files.profile ? (await cloudinary.uploader.upload(files.profile[0].path, { resource_type: "image" })).secure_url : null, // Assuming you have a profile image upload as well
            DOB : new Date(body.DOB),
            gender: body.gender,
            NIC: body.NIC,
            NIC_photo: NIC_photo.secure_url,
            proof: proof.secure_url,
            certificate: certificate.secure_url,
          },
        });

        await newAcademy.save();

        // Send email to admin
        const mailOptions = {
          from: body.email,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Academy Registration Request',
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
              <h2 style="color: #2c3e50;">🏫 New Academy Registration</h2>
              <p>Hello Admin,</p>
              <p>A new academy has been submitted for approval.</p>
              <ul>
                <li><strong>Academy:</strong> ${body.academyName}</li>
                <li><strong>Short Description:</strong> ${body.shortDescription}</li>
                <li><strong>duration: ${body.duration}</li>  
                <li><strong>feeAmount: ${body.feeAmount}</li>
                <li><strong>Mode:</strong> ${body.mode}</li>
                ${body.startDate ? `<li><strong>Start Date:</strong> ${body.startDate}</li>` : ''}
                <li><strong>Owner:</strong> ${body.fullName}</li>
                <li><strong>Email:</strong> ${body.email}</li>
                <li><strong>Contact:</strong> ${body.contactNo}</li>
                <li><strong>City:</strong> ${body.city}, ${body.district}</li>
              </ul>
              <p>Please review it in the admin panel.</p>
            </div>
          `
        };

        await transporter.sendMail(mailOptions);

        // Create JWT token for the owner
        const token = jwt.sign({ id: newAcademy._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "None",
          maxAge: 7 * 24 * 3600 * 1000
        });

        return res.json({
          success: true,
          message: "Academy registration submitted successfully. Awaiting approval!",
          token
        });

      } catch (error) {
        console.error("Error during academy registration:", error);
        return res.json({ success: false, message: error.message });
      }
};


// Get all academies
export const getAllAcademies = async (req, res) => {
    try {
      const academies = await Academy.find();
      res.status(200).json({ success: true, academies });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch academies', error: error.message });
    }
}


// Get academy by ID  
export const getAcademyById = async (req, res) => {
    try {
        const academyId = req.params.id;
        const academy = await Academy.findById(academyId);
        if (!academy) return res.status(404).json({ success: false, message: "Academy not found" });
        res.status(200).json({ success: true, academy });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch academy', error: error.message });
    }
}


// Update academy details 
export const updateAcademy = async (req, res) => {
  try {
      const academyId = req.params.id;
      const { body, files } = req;

      //const { name, shortDesc, description, location, mode, isFlexible, feeAmount } = req.body;
      const existingAcademy = await academicsModel.findById(academyId);
      if (!existingAcademy) {
        return res.json({ success: false, message: "Academy not found" });
      }

      const updateData = {
        academyInfo: {
          ...existingAcademy.personalInfo,
          name: body.name || existingAcademy.personalInfo.name,
          DOB: body.DOB || existingAcademy.personalInfo.DOB,
          gender: body.gender || existingAcademy.personalInfo.gender,
          NIC: body.NIC || existingAcademy.personalInfo.NIC,
        },
        contactDetails: {
          ...existingAcademy.contactDetails,
          contactNo: body.contactNo || existingAcademy.contactDetails.contactNo,
          HomeTP: body.HomeTP || existingAcademy.contactDetails.HomeTP,
          whatsapp: body.whatsapp || existingAcademy.contactDetails.whatsapp,
          email: body.email || existingAcademy.contactDetails.email,
        },
        Address: {
          ...existingAcademy.Address,
          Line1: body.Line1 || existingAcademy.Address.Line1,
          Line2: body.Line2 || existingAcademy.Address.Line2,
          city: body.city || existingAcademy.Address.city,
          district: body.district || existingAcademy.Address.district,
        },
        coachSelection: {
          ...existingAcademy.coachSelection,
          selectionType: body.selectionType || existingAcademy.coachSelection.selectionType,
          school_Academics: body.school_Academics || existingAcademy.coachSelection.school_Academics,
          sport: body.sport || existingAcademy.coachSelection.sport,
          qualifications: body.qualifications || existingAcademy.coachSelection.qualifications,
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
  
  
      const updatedAcademy = await academicsModel.findByIdAndUpdate(
        academyId,
        updateData,
        { new: true }
      );
  
      return res.json({
        success: true,
        message: "Academy details updated successfully",
        data: updatedAcademy
      });

  } catch (err) {
      res.status(500).json({ success: false, message: err.message });
  }
        
};


// Delete an academy



// Apply to an academy
export const applyToAcademy = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
          academyId,
          preferredStartDate,
          documents,
        } = req.body;
    
        const academy = await Academy.findById(academyId);
        if (!academy) return res.status(404).json({ success: false, message: "Academy not found" });

        const bookingData = {
            academyId,
            preferredStartDate: academy.isFlexible ? preferredStartDate : null,
            startDate: academy.isFlexible ? null : academy.startDates[0],
            isApprove: false,
            isPayment: "",
            duration: academy.duration,
            documents,
        };

        await User.findByIdAndUpdate(userId, {
        $push: { academicsBooking: bookingData },
        });
      
        res.status(200).json({ success: true, message: "Applied to academy" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


// Get booking status
export const getAcademyStatus = async (req, res) => {
    try {
      const userId = req.user._id;
      const { academyId } = req.params;
  
      const user = await User.findById(userId).populate("academicsBooking.academyId");
  
      const booking = user.academicsBooking.find((a) => a.academyId._id.toString() === academyId);
      if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  
      res.status(200).json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};

// Mark payment
export const markAcademyPayment = async (req, res) => {
    try {
      const userId = req.user._id;
      const { academyId } = req.params;
  
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: userId,
          "academicsBooking.academyId": academyId,
        },
        {
          $set: { "academicsBooking.$.isPayment": "completed" },
        },
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ success: false, message: "Booking not found" });
  
      res.status(200).json({ success: true, message: "Payment marked as completed" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};
