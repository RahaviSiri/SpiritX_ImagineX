import express from "express";
import { addGround, deleteGround, getAllGrounds, getGround, updateGround } from "../controllers/groundController.js";
import upload from "../middleware/multer.js";

const groundRouter = express.Router();

groundRouter.get("/get-all-grounds", getAllGrounds);
groundRouter.get("/get-ground/:id", getGround);
groundRouter.post("/add-ground", upload.single("image"), addGround);
groundRouter.delete("/delete-ground/:id", deleteGround);
groundRouter.post("/update-ground/:id", upload.single("image"), updateGround);


export default groundRouter;

