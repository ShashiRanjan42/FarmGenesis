const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
    email: {
        type: mongoose.Schema.Types.String,
        ref: 'Farmer',
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cropName: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
        trim: true
    },
    perKgPrice: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Crop = mongoose.model('Crop', CropSchema);

module.exports = Crop;
