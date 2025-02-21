import express from "express";
import env from "dotenv";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  checkout,
  paymentVerification,
} from "../controllers/payment.controller.js";
env.config();

const paymentRouter = express.Router();

paymentRouter.post("/checkout", authMiddleware, checkout);
paymentRouter.post("/paymentVerification", authMiddleware, paymentVerification);

paymentRouter.get("/getkey", authMiddleware, (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_ID_KEY });
});

export default paymentRouter;
