import mongoose from "mongoose";

const paymentInfoSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
});

const PaymentInfo = new mongoose.model("Paymentinfo", paymentInfoSchema);

export default PaymentInfo;
