const payment = require('../model/transection');
const Farmer = require('../model/Farmer');
const User = require('../model/User')
const mongoose = require('mongoose');
const Transection = require('../model/transection');

exports.addPayments = async (req, res, next) => {
    try {
        console.log(req.body);

        const { email, farmerEmail, cropName, quantity, paymentId,orderId, amount } = req.body;

        const farmerdata = await Farmer.findOne({ email: email });

        console.log(farmerdata);

        const newPayment = new payment({
            email: email,
            farmerEmail: farmerEmail,
            cropName: cropName,
            quantity: quantity,
            amount: amount,
            paymentId: paymentId,
            orderId: orderId,
        });

        const savedPayment = await newPayment.save();

        res.status(200).send({ status: 200, data: { newPayment: savedPayment }, message: "Transection added successfully" });
    } 
    catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send({ status: 400, message: error.message });
        } else {
            next(error);
        }
    }
};

exports.showPayments = async (req, res, next) => {
    // const { email } = req.body;
    const email = req.params.id;

    try {
        // Find the transaction data by email
        const data = await Transection.findAll({ where: { email: email } });

        if (!data || data.length === 0) 
            {
            return res.status(404).json({ status: 404, message: "No transactions found for the provided email" });
        }

        // If data is found, return it
        res.status(200).json({
            status: 200,
            data: data
        });
    } 
    catch (error) {
        next(error);
    }
};


exports.showFarmerPayments = async (req, res, next) => {
    const { farmerEmail } = req.body;

    try {
        // Find the transaction data by email
        const data = await Transection.findOne({ farmerEmail: farmerEmail });

        if (!data) {
            return res.status(404).json({ status: 404, message: "No transactions found for the provided email" });
        }

        // If data is found, return it
        res.status(200).json({
            status: 200,
            data: data
        });
    } catch (error) {
        next(error); // Pass any caught errors to the error handling middleware
    }
};