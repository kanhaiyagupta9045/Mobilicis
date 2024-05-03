const User = require('../models/userModel')
const { validationResult } = require('express-validator');

exports.VerifyOTP = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const { email, otp } = req.body
        if (!email) {
            return res.status(400).json({ "error": "Please enter Email" })
        }
        if (!otp || otp.length < 6 || otp.length > 6) {
            return res.status(400).json({ "error": "Please enter correct OTP" })
        }



        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const user = await User.findOne({ "email": email });
        if (!user) {
            return res.status(400).json({ error: 'User Not found' });
        }


        if (user.otp !== otp || Date.now() > user.otpExpires) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        user.isVerified = true;
        await user.save();
        res.status(200).json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}