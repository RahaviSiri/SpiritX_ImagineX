import express from "express";
import { addGround, getAllGrounds, getGround } from "../controllers/groundController.js";
import upload from "../middleware/multer.js";

const groundRouter = express.Router();

groundRouter.get("/get-all-grounds", getAllGrounds);
groundRouter.get("/get-ground/:id", getGround);
groundRouter.post("/add-ground", upload.single("image"), addGround);


export default groundRouter;

