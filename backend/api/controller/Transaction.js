const Razorpay = require("razorpay");
require("dotenv").config();
let Farmer = require('../model/Farmer');
const crypto = require("crypto");

exports.createPaymentLink = async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = req.body;

        // Create order with Razorpay
        const order = await razorpay.orders.create(options);

        // Check if order creation was successful
        if (!order) {
            return res.status(500).json({ error: "Failed to create order" });
        }

        // Return the order details as JSON response
        res.json(order);
    } catch (err) {
        console.error("Error creating payment link:", err);
        res.status(500).json({ error: "Failed to create payment link" });
    }
};

exports.successTransaction = async (req,res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
}
