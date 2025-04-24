import mongoose from "mongoose";

const academySchema = new mongoose.Schema({
  academyBasicDetails: {
    academyName: { type: String, required: true }, // E.g., "ABC Academy, XYZ Institute"

    academyLogo: {type: String}, // URL to the logo image
    picture: {type: String, required: true}, // URL to the picture of the academy or organization

    sportType: { type: String },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },  // E.g., “3 months”
    instructors: { type: String, required: true }, // E.g., "John Doe, Jane Smith"
    feeAmount: { type: Number, default: 0, required: true },
    mode: { type: String, enum: ["Online", "Physical"], required: true },
    isFlexible: { type: Boolean, default: false }, // For online courses
    startDate: { type: Date },
    certificate : {type:String, required:true }, // Certificate of registration or accreditation
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

  isApprove : {type:Boolean,default : false},
  isReject : {type:Boolean,default:false},
  otp:{type:String,default:''},
  isAdvertisementPayment:{type:Boolean,default:false},
});

const academyModel = mongoose.models.academy  || mongoose.model("academy", academySchema);

export default academyModel;
