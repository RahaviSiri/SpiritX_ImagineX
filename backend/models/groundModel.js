import mongoose from "mongoose"

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
    },
    { timestamps: true }
);

const groundModel = mongoose.models.ground || mongoose.model("ground",groundSchema);

export default groundModel;