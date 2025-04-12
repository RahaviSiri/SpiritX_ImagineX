import groundModel from "../models/groundModel.js";
import { v2 as cloudinary } from "cloudinary";

// Get all grounds
const getAllGrounds = async (req, res) => {
  try {
    const grounds = await groundModel.find({});
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
    const ground = await groundModel.findById(id);
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
    const { name, address, category } = req.body;
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
    const imageUpload = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    }).catch((err) => {
      console.log("Cloudinary upload error:", err);
      throw err;  // Propagate the error to be caught by the outer try-catch
    });    
    const ground = new groundModel({
      name,
      address,
      category,
      freeTime,
      image: imageUpload.secure_url,
    });
    await ground.save();
    res.json({ success: true, ground });
  } catch (error) {
    console.log("Error in getting ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAllGrounds, getGround, addGround };
