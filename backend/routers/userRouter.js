import express from "express"
import { getUserById, getUserData, loginUser, registerUser,registerCoach } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/get-user-data",authUser,getUserData);
userRouter.get("/get-user-byId",authUser,getUserById);
userRouter.get("/get-user-byId",authUser,getUserById);
userRouter.post("/book-coach/:id",authUser,registerCoach);

export default userRouter;