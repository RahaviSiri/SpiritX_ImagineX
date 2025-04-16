import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({
    coachId:{type:String},
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    district: { type: String, required: true },
    preferredDateTime: { type: Date, required: true },
    notes: { type: String },
    isApprove: { type: Boolean, default: false },
    otp: { type: String, default: '' },
    isPayment : {type:String,default:''}
}, { timestamps: true }
)

const clientModel = mongoose.models.client || mongoose.model('client',clientSchema);

export default clientModel;