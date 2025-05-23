import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    resetOTP: { type: String },
    groundBookings: [
      {
        groundId: { type: mongoose.Schema.Types.ObjectId, ref: "ground" },
        timeSlot: { type: String },
      },
    ],
    coachBooking: [
      {
        coachId: { type: mongoose.Schema.Types.ObjectId, ref: "coach" },
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
        otp: { type: String, default: "" },
        isPayment: { type: String, default: "" },
      },
    ],
    academyBooking: [
      {
        academyId: { type: mongoose.Schema.Types.ObjectId, ref: "academy" },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        contactNumber: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        district: { type: String, required: true },
        
        // Set by users for flexible online courses
        preferredStartDate: { type: Date }, 

        NIC: {type: String, required: true },
        notes: { type: String },
        isApprove: { type: Boolean, default: false },
        rejectionReason: { type: String }, //mail to user
        paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
        otp: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
