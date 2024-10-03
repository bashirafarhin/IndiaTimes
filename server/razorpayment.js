import Razorpay from "razorpay";
import env from "dotenv";
env.config();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
