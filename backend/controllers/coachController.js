import coachModel from "../models/coachModel.js";
import {v2 as cloudinary} from 'cloudinary'
import upload from "../middleware/multer.js";

export const registerCoach = async (req,res) => {
    try {
        const {body} = req;
        // console.log(files);
        const profile = await cloudinary.uploader.upload(req.files.profile[0].path,{
            resource_type:"image"
        })
        const NIC_photo = await cloudinary.uploader.upload(req.files.NIC_photo[0].path,{
            resource_type:"image"
        })
        const qualifications_photo = await cloudinary.uploader.upload(req.files.qualifications_photo[0].path,{
            resource_type:"image"
        })
        console.log(req.files)
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
        if(!user){
            return res.json({success:false,message:"user not found!"})
        }
        await user.save();
        return res.json({success:true,message:"registration successfully completed. Waiting for approval message!"})
    } catch (error) {
        console.log(error)
        return res.json({success:false,message:error.message})
    }
}