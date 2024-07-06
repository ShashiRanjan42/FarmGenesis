let Farmer = require('../model/Farmer');
const mongoose = require('mongoose');

exports.addFarmer = async(req,res,next) => {
    try {
        const { email, totalCropSelled, moneyEarned } = req.body
        
        const newFarmer = new Farmer ({
            email: email,
            totalCropSelled: totalCropSelled,
            moneyEarned: moneyEarned
        })
        const farmer = await newFarmer.save();
        res.status(200).send({ status: 200, message: "Saved" });
        return;
    }
    catch(error) {
        next(error)
    }
}

exports.FarmerDetails = async(req,res,next) => {
    try {
        const Farmers = await Farmer.find({})
        res.status(200).json({
            status: 200,            
            data : {
                Farmers: Farmers
            }
        })
        return;
    }catch(error) {
        next(error)
    }
}

exports.UniqueFarmerDetails = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const farmer = await Farmer.findOne({ userId });

        if (!farmer) {
            return res.status(404).json({ status: 404, message: "User not found" });
        }

        res.status(200).json({
            status: 200,
            data: {
                farmer: farmer
            }
        });
    } catch (error) {
        next(error);
    }
};

