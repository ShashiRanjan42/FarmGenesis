const mongoose = require("mongoose");

const TransectionSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        ref: 'Farmer',
        required: true
    },
    farmerEmail: {
        type: String,
        required: true
    },
    cropName: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    paymentId: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Transection = mongoose.model('Transection', TransectionSchema);

module.exports = Transection;
