import User from "../models/userModel.js";
import Academy from "../models/academyModel.js";

// Apply to an academy
export const applyToAcademy = async (req, res) => {
    try {
        const userId = req.user._id;
        const {
          academyId,
          preferredStartDate,
          documents,
        } = req.body;
    
        const academy = await Academy.findById(academyId);
        if (!academy) return res.status(404).json({ success: false, message: "Academy not found" });

        const bookingData = {
            academyId,
            preferredStartDate: academy.isFlexible ? preferredStartDate : null,
            startDate: academy.isFlexible ? null : academy.startDates[0],
            isApprove: false,
            isPayment: "",
            duration: academy.duration,
            documents,
        };

        await User.findByIdAndUpdate(userId, {
        $push: { academicsBooking: bookingData },
        });
      
        res.status(200).json({ success: true, message: "Applied to academy" });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get booking status
export const getAcademyStatus = async (req, res) => {
    try {
      const userId = req.user._id;
      const { academyId } = req.params;
  
      const user = await User.findById(userId).populate("academicsBooking.academyId");
  
      const booking = user.academicsBooking.find((a) => a.academyId._id.toString() === academyId);
      if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
  
      res.status(200).json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};

// Mark payment
export const markAcademyPayment = async (req, res) => {
    try {
      const userId = req.user._id;
      const { academyId } = req.params;
  
      const updatedUser = await User.findOneAndUpdate(
        {
          _id: userId,
          "academicsBooking.academyId": academyId,
        },
        {
          $set: { "academicsBooking.$.isPayment": "completed" },
        },
        { new: true }
      );
  
      if (!updatedUser) return res.status(404).json({ success: false, message: "Booking not found" });
  
      res.status(200).json({ success: true, message: "Payment marked as completed" });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};
