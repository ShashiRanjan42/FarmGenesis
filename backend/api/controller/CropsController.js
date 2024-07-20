const Crop = require('../model/Crop');
const Farmer = require('../model/Farmer');
const User = require('../model/User')
const mongoose = require('mongoose');

exports.addCrops = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, cropName, quantity, perKgPrice } = req.body;

        const farmerdata = await Farmer.findOne({ email: email });

        console.log(farmerdata);

        const newCrop = new Crop({
            email: email,
            contact: farmerdata.contact,
            name: farmerdata.name,
            cropName: cropName,
            quantity: quantity,
            perKgPrice: perKgPrice
        });

        const savedCrop = await newCrop.save();
        res.status(200).send({ status: 200, data: { newCrop: savedCrop }, message: "Crop added successfully" });
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).send({ status: 400, message: error.message });
        } else {
            next(error);
        }
    }
};



exports.cropsDetails = async (req, res, next) => {
    try {
        const crop = await Crop.find({})
        res.status(200).json({
            status: 200,
            data: {
                crop: crop
            }
        })
        return;
    } catch (error) {
        next(error)
    }
}

exports.cropById = async (req, res, next) => {
    try {
        Crop.findById(req.params.id)
            .then(results => {
                res.status(200).json({
                    status: 200,
                    data: {
                        results: results
                    }
                })
            })
            .catch(error => {
                next(error)
            })
        return;
    } catch (error) {
        next(error)
    }
}
exports.updateCrop = async (req, res, next) => {
    try {
        const { cropName, quantity, perKgPrice } = req.body;

        try {
            // Find and update the crop by id
            const updatedCrop = await Crop.findByIdAndUpdate(
                req.params.id,
                { cropName, quantity, perKgPrice },
                { new: true } // To return the updated document
            );

            // Check if the crop exists
            if (!updatedCrop) {
                return res.status(404).json({
                    status: 404,
                    message: 'Crop not found',
                });
            }

            // Return updated crop data
            res.status(200).json({
                status: 200,
                data: {
                    updatedCrop: updatedCrop,
                },
            });
        } catch (error) {
            next(error);
        }
    } catch (error) {
        next(error);
    }
};

exports.farmercrops = async (req, res, next) => {
    try {
        const crops = await Crop.find({ email: req.body.email });
        res.status(200).json({
            status: 200,
            data: {
                crops: crops
            }
        })
    } catch (error) {
        next(error)
    }
}

