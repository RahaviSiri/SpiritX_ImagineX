import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { transporter } from "../config/nodemailer.js";
import coachModel from "../models/coachModel.js";

const registerUser = async (req, res) => {
    try {
        const { name, userName, password } = req.body;

        if (!userName || !password) {
            return res.json({ success: false, message: "Please enter details" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter 8-digit password" });
        }

        // Check if the username already exists
        const existingUser = await userModel.findOne({ userName });
        if (existingUser) {
            return res.json({ success: false, message: "Username already taken, choose a different one" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            userName,
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
const loginUser = async (req,res) => {

    try {
        const { userName,password } = req.body;
        const user = await userModel.findOne({userName});

        if(!user){
            return res.json({success:false,message:"User not found"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
            return res.json({success:true,token});
        }else{
            return res.json({success:false,message:'Invalid Password'});
        }
        
    } catch (error) {
        return res.json({success:false,message:error.message});
    }
}

// API to get user Data
const getUserData = async (req, res) => {
    try {
        const user = await userModel.findById(req.body.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

//  Get User by ID
const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      console.log(`Fetching user with ID: ${userId}`); 
      
      const user = await userModel.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      res.json({ success: true, user });
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

        const newBooking = {
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
                Hello ${coach.personalInfo?.fullName || "Coach"},
                
                You have received a new coaching request.

                Client Details:
                -------------------
                Name: ${fullName}
                Email: ${email}
                Contact: ${contactNumber}
                City: ${city}, District: ${district}
                Preferred Date & Time: ${new Date(preferredDateTime).toLocaleString()}

                Additional Notes:
                ${notes || "No additional notes provided."}

                <p>
                    Click below to approve or reject:
                </p>
                <a href="http://localhost:3000/api/admin/approve-by-coach/${user._id}" 
                    style="display:inline-block;padding:10px 20px;background:#28a745;color:white;text-decoration:none;border-radius:5px;">
                    Approve & Send OTP
                </a>
                <a href="http://localhost:3000/api/admin/reject-by-coach/${user._id}" 
                    style="display:inline-block;padding:10px 20px;background:#dc3545;color:white;text-decoration:none;border-radius:5px;">
                    Reject
                </a>
                
                Best regards,<br/>
                Your Coaching Platform
            `
        };

        await transporter.sendMail(mailOptions);

        res.json({ success: true, message: "Coaching request submitted", booking: newBooking });
    } catch (error) {
        console.error("Register Coach Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

  
export { registerUser, loginUser, getUserData,getUserById, registerCoach }