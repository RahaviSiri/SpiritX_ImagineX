import User from "../models/userModel.js";

// Apply to an academy
export const applyToAcademy = async (req, res) => {
  try {
    const {
      userId,
      academyId,
      fullName,
      email,
      contactNumber,
      addressLine1,
      addressLine2,
      city,
      district,
      preferredStartDate,
      duration,
      feeAmount,
      documents,
      notes
    } = req.body;

    const newBooking = {
      academyId,
      fullName,
      email,
      contactNumber,
      addressLine1,
      addressLine2,
      city,
      district,
      preferredStartDate,
      duration,
      feeAmount,
      documents,
      notes
    };

    const user = await User.findById(userId);
    user.academicsBooking.push(newBooking);
    await user.save();

    res.status(201).json({ success: true, message: "Applied to academy!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check all academy application statuses of a user
export const getAcademyStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("academicsBooking.academyId");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, bookings: user.academicsBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Mark payment as completed
export const markAcademyPaymentComplete = async (req, res) => {
  try {
    const { userId, bookingId } = req.params;
    const { transactionId } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const booking = user.academicsBooking.id(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    booking.paymentStatus = "completed";
    booking.transactionId = transactionId;
    await user.save();

    res.json({ success: true, message: "Payment marked as completed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
