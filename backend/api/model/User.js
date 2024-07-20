const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
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
        unique: true,
        trim: true
    },
    isFarmer: {
        type: Boolean,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);
module.exports = User;
