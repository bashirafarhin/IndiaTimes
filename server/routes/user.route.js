import express from "express";
import { userFeedback, updateUserProfile } from "../controllers/user.controller.js";
import { authMiddleware} from '../middlewares/auth.middleware.js'

const userRouter = express.Router();

userRouter.post("/feedback", authMiddleware, userFeedback);

userRouter.put("/update-user", authMiddleware, updateUserProfile);

// userRouter.get("/user-profile", authMiddleware, getUserProfile);

export default userRouter;
