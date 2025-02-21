import { instance } from "../razorpayment.js";
import crypto from "crypto";
import PaymentInfo from "../Database/Models/payment.js";
import User from "../Database/Models/users.js";

export const checkout = async (req, res) => {
  var options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const paymentVerification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
  const userId = req.user.userId;
  const secret = process.env.RAZORPAY_SECRET_KEY;
  const generated_signature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");
  if (generated_signature === razorpay_signature) {
    try {
      await updateUserPaymentStatus(userId, {
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        status: "successful",
      });
      res.redirect(
        `${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } catch (error) {
      res.redirect(`${process.env.FRONTEND_URL}/paymentfailure`);
    }
  } else {
    res.redirect(`${process.env.FRONTEND_URL}/paymentfailure`);
  }
};

export const updateUserPaymentStatus = async (userId, paymentInfo) => {
  try {
    let payment = await PaymentInfo.findOne({ userId });
    if (!payment) {
      payment = new PaymentInfo({
        userId,
        status: paymentInfo.status,
        razorpay_payment_id: paymentInfo.razorpay_payment_id,
        razorpay_order_id: paymentInfo.razorpay_order_id,
      });
    } else {
      payment.status = paymentInfo.status;
      payment.razorpay_payment_id = paymentInfo.razorpay_payment_id;
      payment.razorpay_order_id = paymentInfo.razorpay_order_id;
    }
    await User.findOneAndUpdate({ userId: userId }, { subscription: true });
    await payment.save();
  } catch (error) {
    throw new Error(`Database update failed: ${error.message}`);
  }
};
