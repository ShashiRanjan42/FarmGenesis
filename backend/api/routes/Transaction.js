const express = require("express");

const router = express.Router();

const TransactionController = require("../controller/Transaction");
const { addPayments, showPayments, showFarmerPayments } = require('../controller/paymentController');

router.post("/create-payment",TransactionController.createPaymentLink);
router.post("/success-transaction",TransactionController.successTransaction);
router.post("/addOrder", addPayments);
router.get("/addOrder/showPayment/:id", showPayments);
router.post("/addOrder/showFarmerPayments",showFarmerPayments);

module.exports = router;