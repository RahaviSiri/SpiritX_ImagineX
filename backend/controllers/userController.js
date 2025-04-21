import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { transporter } from "../config/nodemailer.js";
import coachModel from "../models/coachModel.js";
import mongoose from "mongoose";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Please enter details" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter 8-digit password" });
        }

        // Check if the email already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "email already taken, choose a different one" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashPassword,
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


// API for login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        } else {
            return res.json({ success: false, message: 'Invalid Password' });
        }

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// API to get user Data
const getUserData = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//  Get User by ID
const getUserById = async (req, res) => {
    try {
        const userId = req.user._id
        console.log(`Fetching user with ID: ${userId}`);

        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log(user)
        return res.json({ success: true, user });
    } catch (error) {
        console.error(`Error fetching user: ${error.message}`);
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Register Coach
const registerCoach = async (req, res) => {
    try {
        const { id } = req.params; // This should be the coachId
        const userId = req.user._id;
        const {
            fullName,
            email,
            contactNumber,
            addressLine1,
            addressLine2,
            city,
            district,
            preferredDateTime,
            notes,
        } = req.body;

        if (!userId || !id) {
            return res.status(400).json({ success: false, message: "User ID and Coach ID are required" });
        }
        
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // console.log(user)

        if (new Date(preferredDateTime).getTime() < Date.now()) {
            return res.json({
              success: false,
              message: "You cannot book a session in the past."
            });
          }          

        const newBooking = {
            _id: new mongoose.Types.ObjectId(),
            coachId: id,
            fullName,
            email,
            contactNumber,
            addressLine1,
            addressLine2,
            city,
            district,
            preferredDateTime,
            notes,
        };

        user.coachBooking.push(newBooking);
        await user.save();

        const coach = await coachModel.findById(id);
        if (!coach || !coach.contactDetails?.email) {
            return res.status(404).json({ success: false, message: "Coach or coach email not found" });
        }
        
        const mailOptions = {
            from: process.env.ADMIN_EMAIL,
            to: coach.contactDetails.email,
            subject: `New Coaching Request from ${fullName}`,
            html: `
              <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #0056b3;">Hello ${coach.personalInfo?.fullName || "Coach"},</h2>
                
                <p>You have received a new coaching request from one of our clients. Please find the details below:</p>
          
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr>
                    <td style="padding: 8px; font-weight: bold; width: 30%;">Client Name:</td>
                    <td style="padding: 8px;">${fullName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold;">Email:</td>
                    <td style="padding: 8px;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold;">Contact:</td>
                    <td style="padding: 8px;">${contactNumber}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold;">City:</td>
                    <td style="padding: 8px;">${city}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold;">District:</td>
                    <td style="padding: 8px;">${district}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px; font-weight: bold;">Preferred Date & Time:</td>
                    <td style="padding: 8px;">${new Date(preferredDateTime).toLocaleString()}</td>
                  </tr>
                </table>
          
                <h3>Additional Notes:</h3>
                <p style="background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${notes || "No additional notes provided."}</p>
          
                <p style="margin-top: 20px;">Please review and take action:</p>
          
                <div>
                  <a href="http://localhost:3000/api/admin/approve-by-coach/${user._id}/${newBooking._id}" 
                     style="display:inline-block; padding: 12px 25px; background-color: #28a745; color: white; text-decoration: none; border-radius: 5px; margin-right: 15px;">
                     Approve & Send OTP
                  </a>
                  
                  <a href="http://localhost:3000/api/admin/reject-by-coach/${user._id}/${newBooking._id}" 
                     style="display:inline-block; padding: 12px 25px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">
                     Reject
                  </a>
                </div>
          
                <br/>
                <p style="color: #555;">Best regards,<br/>
                <strong>Your Coaching Platform</strong></p>
              </div>
            `
          };
          

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Coaching request submitted", booking: newBooking });
    } catch (error) {
        console.error("Register Coach Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const checkOTPByUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const { bookingId, email, otp } = req.body;
        console.log("BODY: ", req.body);
        console.log("USER: ", req.user);

        console.log(bookingId)

        if (!bookingId || !otp || !email) {
            return res.json({ success: false, message: "Booking ID and OTP are required!" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found!" });
        }

        // Find the specific booking using bookingId
        const booking = user.coachBooking.find(b => b._id.toString() === bookingId);
        if (!booking) {
            return res.json({ success: false, message: "Booking not found!" });
        }

        if (booking.otp !== String(otp)) {
            return res.json({ success: false, message: "Invalid OTP. Please enter the correct OTP." });
        }

        // OTP is valid — initiate payment session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Coaching Session Booking Fee',
                            description: 'Payment for booked coaching session',
                        },
                        unit_amount: 5000, // $50.00 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `http://localhost:5173/verify?success=true&userId=${user._id}`,
            cancel_url: `http://localhost:5173/verify?success=false&userId=${user._id}`,
            metadata: {
                bookingId: booking._id.toString(),
                userId: user._id.toString(),
            },
        });

        return res.json({ success: true, message: "OTP verified! Proceed to payment.", session_url: session.url });

    } catch (error) {
        console.error("OTP Check Error:", error);
        return res.json({ success: false, message: error.message });
    }
};

const resetOTP = async (req,res) => {
    const {email} = req.body;
    if(!email){
        res.json({success:false,message:"email is required"})
    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            res.json({success:false,message:"User not found!"});
        }
        const otp = Math.floor(100000 + Math.random() * 900000);
        user.resetOTP = otp;
        
        await user.save();

        const mailOption = {
            from : process.env.SENDER_EMAIL,
            to : user.email,
            subject : "Your OTP to Reset your account password! ",
            text : `Your otp is ready to reset your password. Your OTP is ${otp}`
            
            
        }

        await transporter.sendMail(mailOption);
        return res.json({success:true,message:"Reset OTP is sent successfully.",email})

        
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const resetOtpCheck = async (req,res) => {
    try {
        const {email,otp} = req.body;
        if(!email || !otp){
            return res.json({success:false,message:"Email and OTP are required!"})
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        if(user.resetOTP === "" || user.resetOTP !== String(otp)){
            return res.json({success:false,message:"OTP is Invalid!"})

        }
        
        return res.json({success:true,message:"OTP is correct",otp})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
const resetPassword  = async (req,res) => {
    const {email, newPassword,confirmNewPassword} = req.body;
    if(!email  || !newPassword || !confirmNewPassword){
        res.json({success:false,message:"email,otp,newPassword are required"});

    }
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found!"})
        }
        
        if(newPassword !== confirmNewPassword){
            return res.json({success:false,message:"Confirm new password is mismatch with new password!"})
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        const hashedConfirmPassword = await bcrypt.hash(confirmNewPassword,10);
        user.password = hashedPassword;
        user.confirmNewPassword = hashedConfirmPassword;
        
        
        await user.save();
        return res.json({success:true,message:"Reset passwaord successfully!"})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})

    }
}

export { registerUser, loginUser, getUserData, getUserById, registerCoach, checkOTPByUser,resetOTP, resetOtpCheck, resetPassword }