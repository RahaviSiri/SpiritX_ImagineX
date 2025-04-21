import express from "express"
import { contactForm } from "../controllers/userContactController.js";

const  contactRouter = express.Router();

contactRouter.post("/contact-admin",contactForm);

export default contactRouter;