import groundModel from "../models/groundModel.js";
import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import validator from "validator";
import { transporter } from "../config/nodemailer.js";

// Get all grounds
const getAllGrounds = async (req, res) => {
  try {
    const grounds = await groundModel
      .find({})
      .select("-ownerPassword -ownerEmail");
    res.json({ success: true, grounds });
  } catch (error) {
    console.log("Error in getting all grounds", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get one ground by ID
const getGround = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const ground = await groundModel
      .findById(id)
      .select("-ownerPassword -ownerEmail");
    console.log(ground);
    if (!ground) {
      return res
        .status(404)
        .json({ success: false, message: "Ground not found" });
    }
    res.json({ success: true, ground });
  } catch (error) {
    console.log("Error in getting ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Ground
const addGround = async (req, res) => {
  try {
    const { name, address, category, ownerEmail, ownerPassword, groundType } =
      req.body;
    const image = req.file;
    let freeTime = req.body.freeTime;

    // Handle stringified array from frontend
    if (typeof freeTime === "string") {
      try {
        freeTime = JSON.parse(freeTime);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid freeTime format" });
      }
    }
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader
      .upload(image.path, {
        resource_type: "image",
      })
      .catch((err) => {
        console.log("Cloudinary upload error:", err);
        throw err; // Propagate the error to be caught by the outer try-catch
      });

    if (!validator.isEmail(ownerEmail)) {
      return res.json({ success: false, message: "Enter valid Email" });
    }

    if (ownerPassword.length < 8) {
      return res.json({
        success: false,
        message: "Enter 8 digit correct password",
      });
    }

    // Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(ownerPassword, salt);

    const ground = new groundModel({
      name,
      address,
      category,
      freeTime,
      image: imageUpload.secure_url,
      ownerEmail,
      ownerPassword: hashPassword,
      groundType,
    });
    await ground.save();
    res.json({ success: true, ground });
  } catch (error) {
    console.log("Error in getting ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete ground by ID
const deleteGround = async (req, res) => {
  try {
    const { id } = req.params;
    await groundModel.findByIdAndDelete(id);
    res.json({ success: true });
  } catch (error) {
    console.log("Error in getting ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update ground
const updateGround = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, category, groundType } = req.body;
    let freeTime = req.body.freeTime;

    // Handle stringified array
    if (typeof freeTime === "string") {
      try {
        freeTime = JSON.parse(freeTime);
      } catch (err) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid freeTime format" });
      }
    }

    // Get existing ground
    const existingGround = await groundModel.findById(id);
    if (!existingGround) {
      return res
        .status(404)
        .json({ success: false, message: "Ground not found" });
    }

    let imageUrl = existingGround.image;

    // If a new image is uploaded
    if (req.file) {
      const imageUpload = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    }

    await groundModel.findByIdAndUpdate(
      id,
      {
        name,
        address,
        category,
        freeTime,
        image: imageUrl,
        groundType,
      },
      { new: true }
    );

    res.json({ success: true });
  } catch (error) {
    console.log("Error in updating ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Validate Ground
const validateGround = async (req, res) => {
  try {
    const { id } = req.params;
    const { ownerPassword, ownerEmail } = req.body;

    const ground = await groundModel.findById(id);
    if (!ground) {
      return res
        .status(404)
        .json({ success: false, message: "Ground not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      ownerPassword,
      ground.ownerPassword
    );

    if (ground.ownerEmail === ownerEmail && isPasswordCorrect) {
      return res.json({ success: true });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Enter correct credentials" });
    }
  } catch (error) {
    console.log("Error in validating ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Handle Booking
const handleBooking = async (req, res) => {
  try {
    const { groundId, timeSlot } = req.body;
    const userId = req.user._id;

    if (!groundId || !userId || !timeSlot) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const ground = await groundModel.findById(groundId);
    const user = await userModel.findById(userId);

    if (!ground || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Ground or User not found" });
    }

    // Check if the slot is still available
    if (!ground.freeTime.includes(timeSlot)) {
      return res
        .status(400)
        .json({ success: false, message: "Time slot not available" });
    }

    // Remove the time slot from available slots
    ground.freeTime = ground.freeTime.filter((slot) => slot !== timeSlot);

    // Add booking to ground
    ground.bookings.push({
      userId,
      timeSlot,
      status: "pending",
    });

    // Add booking to user
    user.groundBookings.push({
      groundId,
      timeSlot,
    });

    await ground.save();
    await user.save();

    // Send notification email to the ground owner
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: ground.ownerEmail,
      subject: "📅 New Ground Booking Request Received!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #1a73e8;">Hello Ground Owner,</h2>
    
          <p>We’re excited to inform you that a new booking request has been made for your ground.</p>
    
          <div style="background-color: #f1f1f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-bottom: 10px; color: #444;">📌 Booking Details</h3>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>⏰ Time Slot:</strong> ${timeSlot}</li>
              <li><strong>👤 Booked By:</strong> ${user.name}</li>
            </ul>
          </div>
    
          <p>If you have any questions or need to follow up, please log in to your dashboard.</p>
    
          <p style="margin-top: 30px;">Best regards,<br />
          <strong>Your Ground Booking Team</strong></p>
        </div>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Mail sent successfully");
    } catch (err) {
      console.error("Failed to send mail:", err);
    }
    return res.json({ success: true, message: "Booking successful" });
  } catch (error) {
    console.log("Error in booking ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all booking
const getAllBookings = async (req, res) => {
  try {
    const grounds = await groundModel
      .find()
      .populate("bookings.userId", "name");

    const bookings = [];

    grounds.forEach((ground) => {
      ground.bookings.forEach((booking) => {
        bookings.push({
          groundId: ground._id,
          bookingId: booking._id,
          groundName: ground.name,
          ownerEmail: ground.ownerEmail,
          userId: booking.userId,
          userName: booking.userId?.name || "Unknown User",
          timeSlot: booking.timeSlot,
          status: booking.status,
          bookedTime: booking.bookedAt,
        });
      });
    });

    return res.json({ success: true, bookings });
  } catch (error) {
    console.error("Error in getAllBookings:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel Booking
const cancelBooking = async (req, res) => {
  try {
    const { groundId, timeSlot, userId } = req.body;

    if (!groundId || !userId || !timeSlot) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const ground = await groundModel.findById(groundId);
    const user = await userModel.findById(userId);

    if (!ground || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Ground or User not found" });
    }

    // Add time slot back to freeTime if not present
    if (!ground.freeTime.includes(timeSlot)) {
      ground.freeTime.push(timeSlot);
    }

    // ✅ Find and update the status of the matching booking
    const booking = ground.bookings.find(
      (b) => b.userId.toString() === userId && b.timeSlot === timeSlot
    );

    if (booking) {
      booking.status = "cancelled";
    }

    // ✅ Also remove the booking from the user's bookings
    user.groundBookings = user.groundBookings.filter(
      (booking) =>
        booking.groundId.toString() !== groundId ||
        booking.timeSlot !== timeSlot
    );

    await ground.save();
    await user.save();

    // ✅ Fix email sending: Use user.email, not user.userName
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.email,
      subject: "⚠️ Ground Booking Cancellation Notice",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #e53935;">Dear ${user.name},</h2>
    
          <p>We regret to inform you that your booking for the time slot <strong>${timeSlot}</strong> has been cancelled.</p>
    
          <div style="background-color: #f1f1f1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-bottom: 10px; color: #444;">📅 Booking Cancellation Details</h3>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>⏰ Time Slot Cancelled:</strong> ${timeSlot}</li>
            </ul>
          </div>
    
          <p>You can now choose another available time slot for your ground booking. If you need assistance, please contact us.</p>
    
          <p style="margin-top: 30px;">Thank you for your understanding,<br />
          <strong>Your Ground Booking Team</strong></p>
        </div>
      `,
    };    

    try {
      await transporter.sendMail(mailOptions);
      console.log("Mail sent successfully");
    } catch (err) {
      console.error("Failed to send mail:", err);
    }

    return res.json({ success: true, message: "Booking Cancelled" });
  } catch (error) {
    console.log("Error in cancelling ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// make verify of ground
const verifyGround = async (req, res) => {
  try {
    const { id } = req.params;
    const ground = await groundModel.findById(id);

    if (!ground) {
      return res
        .status(404)
        .json({ success: false, message: "Ground not found" });
    }

    ground.verified = true;
    await ground.save();

    return res.json({ success: true, message: "Ground Verified Successfully" });
  } catch (error) {
    console.log("Error in verifying ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getAllGrounds,
  getGround,
  addGround,
  deleteGround,
  updateGround,
  validateGround,
  handleBooking,
  cancelBooking,
  getAllBookings,
  verifyGround,
};
