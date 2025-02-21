import express from "express";
import passport from "passport";
import { logout, loginSuccess, loginFailure, googleCallback } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.get("/logout", authMiddleware, logout);

// for user whose session already exists
authRouter.get("/login/success", authMiddleware, loginSuccess);

authRouter.get("/login/failure", loginFailure);

// for user who are logging or registering using google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRouter.get("/google/callback", googleCallback);

export default authRouter;
