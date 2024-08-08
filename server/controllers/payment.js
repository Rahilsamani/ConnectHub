import { instance } from "../index.js";
import crypto from "crypto";
import Payment from "../models/payment.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong while checking out the order",
      error: err.message,
    });
  }
};

export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // save the payment details in the database
      await Payment.create({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      });

      res.redirect("http://localhost:3002/donate");
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while checking out the order",
      error: err.message,
    });
  }
};
