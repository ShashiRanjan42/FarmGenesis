const Razorpay = require("razorpay");
require("dotenv").config();
let Farmer = require('../model/Farmer');

exports.createPaymentLink = async (req, res, next) => {
    try {
        const {
            amount,
            currency = 'INR',
            desc,
            customer_name,
            customer_email,
            customer_contact,
            notesObj,
        } = req.body;

        // Logging to check if environment variables are loaded correctly
        console.log("KEY_ID:", process.env.KEY_ID);
        console.log("KEY_SECRET:", process.env.KEY_SECRET);

        if (!process.env.KEY_ID || !process.env.KEY_SECRET) {
            return res.status(500).json({
                message: "Razorpay key_id and key_secret must be set in environment variables"
            });
        }

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message: "Amount must be a positive value"
            });
        }

        const instance = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });

        const paymentLink = await instance.paymentLink.create({
            amount: amount * 100, // Convert amount to paise
            currency: currency,
            accept_partial: true,
            first_min_partial_amount: Math.min(100, amount * 100),
            description: desc,
            customer: {
                name: customer_name,
                email: customer_email,
                contact: customer_contact
            },
            notify: {
                sms: true,
                email: true
            },
            reminder_enable: true,
            notes: {
                ...notesObj
            },
            callback_url: `http://localhost:8000/api/transaction/success-transaction?farmer=${customer_email}&amount=${amount}&quantity=${notesObj.quantity}`,
            callback_method: "get"
        });

        return res.status(200).json({
            message: "Transaction link created successfully",
            paymentLink
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.successTransaction = async (req, res, next) => {
    try {
        const { farmer, amount, quantity } = req.query;

        const farmerData = await Farmer.findOne({ email: farmer });
        if (!farmerData) {
            return res.status(404).json({
                message: "Farmer not found"
            });
        }

        farmerData.moneyEarned += parseFloat(amount);
        farmerData.totalCropSelled += parseFloat(quantity);
        await farmerData.save();

        res.redirect("http://localhost:3000");
    } catch (error) {
        console.error(error);
        res.redirect("http://localhost:3000");
    }
};
