import { v2 as cloudinary } from 'cloudinary';
import Competition from "../models/competitionModel.js";
import dotenv from 'dotenv';
import fs from 'fs';

export const getCompetition = async (req, res) => {
    const competitions = await Competition.find();
    console.log(competitions);
    return res.json({success:true, message:"fecthed successfully!" ,competitions});
  };

  export const registerCompetition = async (req, res) => {
    try {
      const filePath = req.file.path;
      dotenv.config();
  
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "image",
        folder: 'competitions',
      });
  
      // Save to DB
      const competition = new Competition({
        posterImage: result.secure_url,
        registrationLink: req.body.registrationLink,
      });
      await competition.save();
  
      // Delete local file
      fs.unlinkSync(filePath);
  
      res.status(201).json({success:true, message: 'Competition created!' });
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: err.message });
    }
  }