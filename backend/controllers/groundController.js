import groundModel from "../models/groundModel.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import validator from "validator"

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
      return res.json({ success: false, message: "Enter 8 digit correct password" });
    }

    // Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(ownerPassword,salt);

    const ground = new groundModel({
      name,
      address,
      category,
      freeTime,
      image: imageUpload.secure_url,
      ownerEmail,
      ownerPassword : hashPassword,
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

    const isPasswordCorrect = await bcrypt.compare(ownerPassword, ground.ownerPassword);

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


export { getAllGrounds, getGround, addGround, deleteGround, updateGround,validateGround };
