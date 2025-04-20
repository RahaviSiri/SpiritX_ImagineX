import express from "express";
import { getAllAcademics, getAcademy, addAcademy, deleteAcademy, updateAcademy } from "../controllers/academicsController.js";
import upload from "../middleware/multer.js";

const academicsRouter = express.Router();

academicsRouter.get("/get-all-academics", getAllAcademics);
academicsRouter.get("/get-academy/:id", getAcademy);
academicsRouter.post("/add-academy", upload.single("image"), addAcademy);
academicsRouter.delete("/delete-academy/:id", deleteAcademy);
academicsRouter.post("/update-academy/:id", upload.single("image"), updateAcademy);


export default academicsRouter;
