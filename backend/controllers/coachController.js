import coachModel from "../models/coachModel.js";
import { v2 as cloudinary } from 'cloudinary'
import upload from "../middleware/multer.js";
import moment from 'moment'

const getAge = (dob) => {
    return moment().diff(body.moment(dob));
};

export const registerCoach = async (req, res) => {
    try {
        const { body, files } = req;
        console.log(body)
        if (!body || !files) {
            return res.json({ success: false, message: "All fields are required!" })
        }
        // console.log(files);
        const profile = await cloudinary.uploader.upload(files.profile[0].path, {
            resource_type: "image"
        })
        const NIC_photo = await cloudinary.uploader.upload(files.NIC_photo[0].path, {
            resource_type: "image"
        })
        const qualifications_photo = await cloudinary.uploader.upload(files.qualifications_photo[0].path, {
            resource_type: "image"
        });
        if (body.DOB > '2005-01-01') {
            return res.json({ success: false, message: 'You are not qualified for applying a coach.' })
        }
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

        await user.save();
        return res.json({ success: true, message: "registration successfully completed. Waiting for approval message!" })
    } catch (error) {
        console.log(error)
        return res.json({ success: false, message: error.message })
    }
}

export const editDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            
                fullName,
                DOB,
                gender,
                NIC,

            
                contactNo,
                HomeTP,
                whatsapp,
                email,
            
                Line1,
                Line2,
                city,
                district,
            
                selectionType,
                school_Academics,
                sport,
                qualifications,

         } = req.body

         const {files} = req;
        
            const profile = await cloudinary.uploader.upload(files.profile[0].path, {
                resource_type: "image"
            })
            const NIC_photo = await cloudinary.uploader.upload(files.NIC_photo[0].path, {
                resource_type: "image"
            })
            const qualifications_photo = await cloudinary.uploader.upload(files.qualifications_photo[0].path, {
                resource_type: "image"
            });
        console.log(address)
        // const editDetails = {

        // }
    } catch (error) {
        console.log(error)
    }
}