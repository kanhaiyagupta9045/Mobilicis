const nodemailer = require('nodemailer')
require('dotenv').config({ path: './.env' });

const transporter = nodemailer.createTransport({
    service : 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.PASSWORD,
    }
});

const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: email,
            subject: 'OTP for Registration',
            text: `Your OTP for registration is ${otp}. It will expire in 1 hour.`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

module.exports = sendOTPEmail;