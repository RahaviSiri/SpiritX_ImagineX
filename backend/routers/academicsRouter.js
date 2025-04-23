import express from "express";
import { getAllAcademies, addAcademy,  updateAcademy, applyToAcademy, getAcademyStatus, markAcademyPayment } from "../controllers/academicsController.js";
import upload from "../middleware/multer.js";

const academicsRouter = express.Router();

academicsRouter.get("/get-all-academies", getAllAcademies);
//academicsRouter.get("/get-academy/:id", getAcademy);
academicsRouter.post("/add-academy",  upload.fields([
    { name: 'academyLogo', maxCount: 1 },
    { name: 'NIC_photo', maxCount: 1 },
    { name: 'proof', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
    { name: 'picture', maxCount: 1 },
    { name: 'profile', maxCount: 1 }, // if profile upload is optional
  ]), addAcademy);

//academicsRouter.delete("/delete-academy/:id", deleteAcademy);
academicsRouter.post("/update-academy/:id", upload.single("image"), updateAcademy);

academicsRouter.post("/apply-to-academy", applyToAcademy); // User applies
academicsRouter.get("/status/:userId", getAcademyStatus); // Check application status
academicsRouter.put("/payment/:userId/:bookingId", markAcademyPayment); // Mark payment


export default academicsRouter;
