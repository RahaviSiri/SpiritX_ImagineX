import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
    personalInfo : {
        fullName : {type:String,required:true },
        profile : {type:String,required:true },
        DOB : {type:Date, required:true},
        gender : {type:String, required:true},
        NIC : {type:String, required:true},
        NIC_photo : {type:String,required:true },
    },
    contactDetails : {
        contactNo : {type:String, required:true},
        HomeTP : {type:String,},
        whatsapp : {type:String, required:true},
        email : {type:String, required:true},
    },
    Address : {
        Line1 : {type:String,required:true},
        Line2 : {type:String},
        city : {type:String,required:true},
        district : {type:String,required:true},
    },
    coachSelection : {
        selectionType : {type:String,required:true},
        school_Academics : {type:String},
        sport : {type:String,required:true},
        qualifications : {type:String,required:true},
        qualifications_photo : {type:String,required:true},
        
    },
    isApprove : {type:Boolean,default : false},
    otp:{type:String,default:''}

})

const coachModel = mongoose.models.coach  || mongoose.model('coach',coachSchema);

export default coachModel;