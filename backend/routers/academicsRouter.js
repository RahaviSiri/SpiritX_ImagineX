import express from "express";
import { getAllAcademics, getAcademy, addAcademy, deleteAcademy, updateAcademy, applyToAcademy, getAcademyStatus, markAcademyPaymentComplete } from "../controllers/academicsController.js";
import upload from "../middleware/multer.js";

const academicsRouter = express.Router();

academicsRouter.get("/get-all-academics", getAllAcademics);
academicsRouter.get("/get-academy/:id", getAcademy);
academicsRouter.post("/add-academy", upload.single("image"), addAcademy);
academicsRouter.delete("/delete-academy/:id", deleteAcademy);
academicsRouter.post("/update-academy/:id", upload.single("image"), updateAcademy);

router.post("/apply-to-academy", applyToAcademy); // User applies
router.get("/status/:userId", getAcademyStatus); // Check application status
router.put("/payment/:userId/:bookingId", markAcademyPaymentComplete); // Mark payment


export default academicsRouter;
