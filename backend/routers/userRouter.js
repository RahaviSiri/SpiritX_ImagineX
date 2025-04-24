import express from "express"
import { getUserById, getUserData, loginUser, registerUser,registerCoach,  checkOTPByUser, resetOTP, resetOtpCheck, resetPassword, editProfile } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js"

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/edit-profile/:id", upload.single("image"), editProfile);
userRouter.post("/login",loginUser);
userRouter.post("/check-otp-by-user",authUser,checkOTPByUser);
userRouter.get("/get-user-data",authUser,getUserData);
userRouter.get("/get-user-byId",authUser,getUserById);
userRouter.post("/book-coach/:id",authUser,registerCoach);
userRouter.post('/send-reset-otp',resetOTP);
userRouter.post('/check-reset-otp',resetOtpCheck);
userRouter.post('/reset-password',resetPassword);

export default userRouter;