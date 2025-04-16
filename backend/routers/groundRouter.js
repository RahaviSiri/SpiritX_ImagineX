import express from "express";
import { addGround, deleteGround, getAllGrounds, getGround, handleBooking, updateGround, validateGround } from "../controllers/groundController.js";
import upload from "../middleware/multer.js";
import authUser from "../middleware/authUser.js";

const groundRouter = express.Router();

groundRouter.get("/get-all-grounds", getAllGrounds);
groundRouter.get("/get-ground/:id", getGround);
groundRouter.post("/add-ground", upload.single("image"), addGround);
groundRouter.delete("/delete-ground/:id", deleteGround);
groundRouter.post("/update-ground/:id", upload.single("image"), updateGround);
groundRouter.post("/validate-ground/:id", validateGround);
groundRouter.post("/handle-booking",authUser, handleBooking);



export default groundRouter;

