import User from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';
// import moment from 'moment';
import { transporter } from "../config/nodemailer.js";
import Stripe from 'stripe'
import jwt from 'jsonwebtoken'
import academyModel from "../models/academyModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//Add an academy to main page
export const addAcademy = async (req, res) => {
    try {
        const { body, files } = req;
    
        if (!body) {
          return res.json({ success: false, message: "Form data is required!" });
        }


        const requiredFiles = ["picture", "certificate"];

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
        const picture = await cloudinary.uploader.upload(files.picture[0].path, {
          resource_type: "image"
        });
        const certificate = await cloudinary.uploader.upload(files.certificate[0].path, {
          resource_type: "raw"
        });


        const newAcademy = new academyModel({
          academyBasicDetails: {
            academyName: body.academyName,
            academyLogo: academyLogo.secure_url,
            picture: picture.secure_url,
            sportType: body.sportType,
            shortDescription: body.shortDescription,
            description: body.description,
            duration: body.duration,
            instructors: body.instructors,
            feeAmount: body.feeAmount,
            mode: body.mode,
            isFlexible: body.isFlexible === "true",
            startDate: body.startDate ? new Date(body.startDate) : null,
            certificate: certificate.secure_url,
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
                <li><strong>City:</strong> ${body.city}</li> 
                <li><strong>District:</strong>${body.district}</li>
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
      const academies = await academyModel.find();
      res.status(200).json({ success: true, academies });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch academies', error: err.message });
    }
}


// Get academy by ID  
export const getAcademyById = async (req, res) => {
    try {
        const academyId = req.params.id;
        const academy = await academyModel.findById(academyId);
        if (!academy) return res.status(404).json({ success: false, message: "Academy not found" });
        res.status(200).json({ success: true, academy });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch academy', error: err.message });
    }
}


// Update academy details
export const updateAcademy = async (req, res) => {
  try {
      const academyId = req.params.id;
      const { body, files } = req;

      const existingAcademy = await academyModel.findById(academyId);
      if (!existingAcademy) {
        return res.json({ success: false, message: "Academy not found" });
      }

      const updateData = {
        academyBasicDetails: {
          ...existingAcademy.academyBasicDetails,
          academyName: body.academyName || existingAcademy.academyBasicDetails.academyName,
          sportType: body.sportType || existingAcademy.academyBasicDetails.sportType,
          shortDescription: body.shortDescription || existingAcademy.academyBasicDetails.shortDescription,
          description: body.description || existingAcademy.academyBasicDetails.description,
          duration: body.duration || existingAcademy.academyBasicDetails.duration,
          instructors: body.instructors || existingAcademy.academyBasicDetails.instructors,
          feeAmount: body.feeAmount || existingAcademy.academyBasicDetails.feeAmount,
          mode: body.mode || existingAcademy.academyBasicDetails.mode,
          isFlexible: typeof body === "object" && body !== null && "isFlexible" in body
              ? body.isFlexible === "true": existingAcademy.academyBasicDetails.isFlexible,
          startDate: body.startDate ? new Date(body.startDate) : existingAcademy.academyBasicDetails.startDate,
        },
        Address: {
          ...existingAcademy.Address,
          Line1: body.Line1 || existingAcademy.Address.Line1,
          Line2: body.Line2 || existingAcademy.Address.Line2,
          city: body.city || existingAcademy.Address.city,
          district: body.district || existingAcademy.Address.district,
        },
        contactDetails: {
          ...existingAcademy.contactDetails,
          contactNo: body.contactNo || existingAcademy.contactDetails.contactNo,
          HomeTP: body.HomeTP || existingAcademy.contactDetails.HomeTP,
          whatsapp: body.whatsapp || existingAcademy.contactDetails.whatsapp,
          email: body.email || existingAcademy.contactDetails.email,
        },
      };
  
  
      if (files) {
        if (files.academyLogo && files.academyLogo[0]) {
          const academyLogoResult = await cloudinary.uploader.upload(files.academyLogo[0].path, {
            resource_type: "image"
          });
          updateData.academyBasicDetails.academyLogo = academyLogoResult.secure_url;
        }

        if (files.picture && files.picture[0]) {
          const pictureResult = await cloudinary.uploader.upload(files.picture[0].path, {
            resource_type: "image"
          });
          updateData.academyBasicDetails.picture = pictureResult.secure_url;
        }

        if (files.certificate && files.certificate[0]) {
          const certificateResult = await cloudinary.uploader.upload(files.certificate[0].path, {
            resource_type: "raw"
          });
          updateData.academyBasicDetails.certificate = certificateResult.secure_url;
        }
      }
  
  
      const updatedAcademy = await academyModel.findByIdAndUpdate(
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
export const deleteAcademy = async (req, res) => {
  try {
    const academyId = req.params.id;
    const deletedAcademy = await academyModel.findByIdAndDelete(academyId);

    // if (!deletedAcademy) {
    //   return res.status(404).json({ success: false, message: "Academy not found" });
    // }

    res.status(200).json({ success: true, message: "Academy deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// Apply to an academy
export const applyToAcademy = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
          academyId,
          preferredStartDate,
          documents,
        } = req.body;
    
        const academy = await academyModel.findById(academyId);
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
