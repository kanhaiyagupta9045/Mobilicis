require('dotenv').config({ path: "./.env" })
const User = require('../models/userModel')
const sendOTPEMAIL = require('../helpers/helper')
const bcrypt = require('bcrypt')
const otpGenerator = require('otp-generator')
const { validationResult } = require('express-validator');

exports.registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ "error": "Please enter Email" })
        }
        if (!password) {
            return res.status(400).json({ "error": "Please enter Password" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }


        const existingUser = await User.findOne({ "email": email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already registered' });
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        console.log(otp)

        console.log(email,password);

        const newUser = new User({
            email,
            password: hashedPassword,
            otp: otp.toString(),
            otpExpires: Date.now() + 3600000,
        });


        await sendOTPEMAIL(email, otp);
        await newUser.save();

        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
