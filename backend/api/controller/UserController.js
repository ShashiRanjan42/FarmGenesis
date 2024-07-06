const User = require('../model/User');
const Farmer = require('../model/Farmer');
const mongoose = require('mongoose');

exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, contact, isFarmer, password } = req.body;

        if(!name || !email || !contact || !isFarmer || !password) 
        {
            return res.status(400).send({
                message: "All Fields Required",
            });
        }

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).send({ status: 400, message: "User already exists!!!" });
        }

        let userType = false;
        if (isFarmer === "Farmer") {
            userType = true;
            const newFarmer = new Farmer({
                email: email,
                totalCropSelled: 0,
                moneyEarned: 0
            });
            await newFarmer.save();
        }

        const newUser = new User({
            name: name,
            email: email,
            contact: contact,
            isFarmer: userType,
            password: password // Password should be hashed before saving avi baki hai krna
        });
        await newUser.save();
        
        return res.status(201).send({ status: 200, message: "User Registered Successfully" });
    } catch (error) {
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user || user.password !== password) {
            return res.status(400).send({ status: 400, message: "Invalid Username or Password" });
        }

        return res.status(200).json({
            status: 200,
            message: "User Login Successfully",
            data: {
                user: user
            }
        });
    } catch (error) {
        next(error);
    }
};
