import express from "express";
import { getAllGrounds, getGround } from "../controllers/groundController.js";

const groundRouter = express.Router();

groundRouter.get("/get-all-grounds", getAllGrounds);
groundRouter.get("/get-ground/:id", getGround);

export default groundRouter;
