import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
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
    academicsBooking: [
      {
        academyId: { type: mongoose.Schema.Types.ObjectId, ref: "academy" },
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        contactNumber: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        district: { type: String, required: true },
        
        // For flexible online courses
        preferredStartDate: { type: Date }, 

        // Set by the academy after approval
        startDate: { type: Date },       

        duration: { type: String },  // E.g., “3 months”

        documents: [String],         // URLs to uploaded docs

        notes: { type: String },

        isApprove: { type: Boolean, default: false },
        rejectionReason: { type: String },

        paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
        feeAmount: { type: Number, required: true },
        transactionId: { type: String },

        otp: { type: String, default: "" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
