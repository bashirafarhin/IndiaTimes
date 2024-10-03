import mongoose from "mongoose";

const paymentInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "None",
  },
  razorpay_payment_id: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
});

const PaymentInfo = new mongoose.model("Paymentinfo", paymentInfoSchema);

export default PaymentInfo;
