import express from "express";
import { getAllAcademies, getAcademyById, addAcademy,  updateAcademy, deleteAcademy, applyToAcademy, getAcademyStatus, markAcademyPayment } from "../controllers/academyController.js";
import upload from "../middleware/multer.js";

const academyRouter = express.Router();

academyRouter.get("/get-all-academies", getAllAcademies);
academyRouter.get("/get-academy/:id", getAcademyById);

academyRouter.post("/add-academy",  upload.fields([
    { name: 'academyLogo', maxCount: 1 },
    { name: 'picture', maxCount: 1 },
    { name: 'certificate', maxCount: 1 },
  ]), addAcademy
);

academyRouter.delete("/delete-academy/:id", deleteAcademy);

academyRouter.put("/update-academy/:id", upload.fields([
    { name: "academyLogo" },
    { name: "picture" },
    { name: "certificate" }
  ]), updateAcademy
);

academyRouter.post("/apply-to-academy", applyToAcademy); // User applies
academyRouter.get("/status/:userId", getAcademyStatus); // Check application status
academyRouter.put("/payment/:userId/:bookingId", markAcademyPayment); // Mark payment


export default academyRouter;
