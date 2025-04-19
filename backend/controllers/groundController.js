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
      subject: "New Ground Booking Request",
      html: `
        <p>Dear Ground Owner,</p>
        <p>You have received a new booking request for your ground.</p>
        <ul>
          <li><strong>Time Slot:</strong> ${timeSlot}</li>
          <li><strong>User:</strong> ${user.name}</li>
        </ul>
        <p>Thank you!</p>
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
    const grounds = await groundModel.find().populate("bookings.userId", "name");

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
// const cancelBooking = async (req,res) => {
//   try {
//     const { groundId, timeSlot, userId } = req.body;
//     if (!groundId || !userId || !timeSlot) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing required fields" });
//     }

//     const ground = await groundModel.findById(groundId);
//     const user = await userModel.findById(userId);

//     if (!ground || !user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Ground or User not found" });
//     }

//     if (!ground.freeTime.includes(timeSlot)) {
//       ground.freeTime.push(timeSlot);
//     }

//     // Remove the booking from the ground's booking list
//     ground.bookings = ground.bookings.filter(
//       (booking) =>
//         !(booking.userId === userId && booking.timeSlot === timeSlot)
//     );

//     // Remove the booking from the user's booking list
//     user.groundBookings = user.groundBookings.filter(
//       (booking) =>
//         !(booking.groundId === groundId && booking.timeSlot === timeSlot)
//     );
//     ground.bookings.status = "cancelled";

//     await ground.save();
//     await user.save();

//     // Send notification email to the ground owner
//     const mailOptions = {
//       from: process.env.ADMIN_EMAIL,
//       to: user.coachBooking.email,
//       subject: "Ground Booking Cancellation",
//       html: `
//         <p>Dear ${user.name},</p>
//         <p>Your ground booking today at ${timeSlot} is cancelled. Choose another time</p>
//         <p>Thank you!</p>
//       `,
//     };
//     try {
//       await transporter.sendMail(mailOptions);
//       console.log("Mail sent successfully");
//     } catch (err) {
//       console.error("Failed to send mail:", err);
//     }   

//     return res.json({ success: true, message: "Booking Cancelled" });
//   } catch (error) {
//     console.log("Error in cancelling ground", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// }

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

    // Re-add the cancelled time slot if not already in freeTime
    if (!ground.freeTime.includes(timeSlot)) {
      ground.freeTime.push(timeSlot);
    }

    // ✅ Update booking status to "cancelled" in ground.bookings
    // ❌ Remove from ground bookings array
    ground.bookings = ground.bookings.filter(
      (booking) =>
        booking.userId !== userId ||
        booking.timeSlot !== timeSlot
    );


    ground.bookings.status = "cancelled";
    

    // ❌ Remove the booking from user's list (optional)
    user.groundBookings = user.groundBookings.filter(
      (booking) =>
        (
          booking.groundId !== groundId &&
          booking.timeSlot !== timeSlot
        )
    );

    await ground.save();
    await user.save();

    // ✅ Send email to user, not user.coachBooking.email
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: user.userName, // or user.email if you store it
      subject: "Ground Booking Cancellation",
      html: `
        <p>Dear ${user.name},</p>
        <p>Your ground booking at ${timeSlot} has been cancelled. You can now choose another time slot.</p>
        <p>Thank you!</p>
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
      return res.status(404).json({ success: false, message: "Ground not found" });
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
  verifyGround
};
