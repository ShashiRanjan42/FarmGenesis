const User = require('../model/User');
const mongoose = require('mongoose');

exports.changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.params.id;

        // Find the user by userId
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Check if current password matches
        if (currentPassword !== user.password) {
            return res.status(400).json({ status: 400, message: "Current password is incorrect" });
        }

        // Update password
        user.password = newPassword;
        const updatedUser = await user.save();

        res.status(200).json({
            status: 200,
            data: {
                updatedUser: updatedUser
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.deleteAccount = async (req, res, next) => {
    try {
        const { currentPassword } = req.body;
        const userId = req.params.id;

        // Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        // Check if current password matches
        if (currentPassword !== user.password) {
            return res.status(400).json({ status: 400, message: "Current password is incorrect" });
        }

        // Delete user
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            status: 200,
            data: {
                message: "Deleted"
            }
        });
    } catch (error) {
        next(error);
    }
};
