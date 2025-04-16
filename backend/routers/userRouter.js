import express from "express"
import { getUserById, getUserData, loginUser, registerUser } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.get("/get-user-data",authUser,getUserData);
userRouter.get("/get-user-byId/:id",getUserById);

export default userRouter;