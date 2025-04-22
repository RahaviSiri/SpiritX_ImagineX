import mongoose from "mongoose";

const academySchema = new mongoose.Schema({
  academyBasicDetails: {
    academyName: { type: String, required: true }, // E.g., "ABC Academy, XYZ Institute"
    academyLogo: {type: String}, // URL to the logo image
    picture: {type: String, required: true}, // URL to the picture of the academy or organization
    sportType: { type: String },
    shortdescription: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String },  // E.g., “3 months”
    instructors: { type: String, required: true }, // E.g., "John Doe, Jane Smith"
    feeAmount: { type: Number, default: 0, required: true },
    mode: { type: String, enum: ["Online", "Physical"], required: true },
    isFlexible: { type: Boolean, default: false }, // For online courses
    startDate: { type: Date },
  },

  // Address of academy or organization 
  Address : {
    Line1 : {type:String,required:true},
    Line2 : {type:String},
    city : {type:String,required:true},
    district : {type:String,required:true},
  },

  contactDetails : {
    contactNo : {type:String, required:true},
    HomeTP : {type:String,},
    whatsapp : {type:String, required:true},
    email : {type:String, required:true},
  },

  ownerInfo : {
    fullName : {type:String,required:true },
    profile : {type:String,required:true },
    DOB : {type:Date, required:true},
    gender : {type:String, required:true},
    NIC : {type:String, required:true},
    NIC_photo : {type:String, required:true },
    proof : {type:String, required:true }, // Proof of ownership or authorization
    certificate : {type:String, required:true }, // Certificate of registration or accreditation
  },


  // Set by the user after approval for flexible online courses
  preferredStartDate: { type: Date },

  isApprove : {type:Boolean,default : false},
  isReject : {type:Boolean,default:false},
  otp:{type:String,default:''},
  isAdvertisementPayment:{type:Boolean,default:false},
});

const academicsModel = mongoose.models.academy  || mongoose.model("academy", academySchema);

export default academicsModel;
