import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String },
    phone: { type: String },
    address: { type: String},
    userName: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    groundBookings: [
      {
        groundId: { type: mongoose.Schema.Types.ObjectId, ref: "ground" },
        timeSlot: { type: String },
      }
    ],
  },
  { timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
