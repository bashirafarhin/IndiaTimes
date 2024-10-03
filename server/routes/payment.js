import express from "express";
import env from "dotenv";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentControllers.js";
env.config();

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkout);
paymentRouter.post("/paymentVerification", paymentVerification);

paymentRouter.get("/getkey", (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_ID_KEY });
});

export default paymentRouter;
