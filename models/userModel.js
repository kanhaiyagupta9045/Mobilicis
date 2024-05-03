const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, },
    password: { type: String, required: true, },
    twoFactorAuthEnabled: { type: Boolean, default: false, },
    twoFactorAuthSecret: { type: String, },
    loginHistory: [
        {
            date: { type: Date, default: Date.now, },
            device: { userAgent: { type: String, }, ipAddress: { type: String, }, },
            event: { type: String, enum: ['login', 'logout'], required: true, },
        },
    ],
    devices: [
        {
            deviceId: { type: String, required: true, unique: true, },
            userAgent: { type: String, },
            ipAddress: { type: String, },
            lastAccessedAt: { type: Date, default: Date.now, },
        },
    ],
    otp: {
        type: String,
    },
    otpExpires: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;