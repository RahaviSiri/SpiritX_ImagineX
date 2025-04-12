import groundModel from "../models/groundModel.js";

// Get all grounds
const getAllGrounds = async (req, res) => {
  try {
    const grounds = await groundModel.find({});
    res.json({ success: true, grounds });
  } catch (error) {
    console.log("Error in getting all grounds", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get one ground by ID
const getGround = async (req, res) => {
  try {
    const { id } = req.params;
    const ground = await groundModel.findById(id);
    if (!ground) {
      return res.status(404).json({ success: false, message: "Ground not found" });
    }
    res.json({ success: true, ground });
  } catch (error) {
    console.log("Error in getting ground", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getAllGrounds, getGround };
