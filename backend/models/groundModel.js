import mongoose from "mongoose";

const groundSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["indoor", "outdoor", "sports"], 
      trim: true,
    },
    image: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    freeTime: { type: [String], required: true },
    ownerEmail: { type: String, required: true, trim: true },
    ownerPassword: { type: String, required: true, trim: true },
    groundType: { type: String, required: true, trim: true },
    bookings: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
        timeSlot: { type: String, required: true },
        status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
        bookedAt: { type: Date, default: Date.now }
      }
    ],
  },
  { timestamps: true }
);

const groundModel = mongoose.models.ground || mongoose.model("ground", groundSchema);

export default groundModel;
