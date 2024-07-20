const mongoose = require("mongoose");

const FarmerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    totalCropSelled: {  // sold krna spelling check
        type: Number,
        default: 0
    },
    moneyEarned: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Farmer = mongoose.model('Farmer', FarmerSchema);
module.exports = Farmer;
