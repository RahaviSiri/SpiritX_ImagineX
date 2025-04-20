import mongoose from "mongoose";

const academySchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDesc: { type: String },
  description: { type: String },
  location: { type: String },
  mode: { type: String, enum: ["Online", "Physical"], required: true },
  isFlexible: { type: Boolean, default: false },
  startDates: [Date], // For scheduled academies
  feeAmount: { type: Number, default: 0 },
  duration: { type: String }, // e.g., "3 months"
});

export default mongoose.model("academy", academySchema);
