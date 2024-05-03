const speakeasy = require("speakeasy");
const QRCode = require('qrcode');

const secret = speakeasy.generateSecret({ length: 20 });

function generateOTP() {
    return speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32'
    });
}

function generateQRCodeURL() {
    return new Promise((resolve, reject) => {
        QRCode.toDataURL(secret.otpauth_url, (err, dataURL) => {
            if (err) {
                reject(err);
            } else {
                resolve(dataURL);
            }
        });
    });
}
 exports.generateOtp = async (req, res) => {
    try {
        const dataURL = await generateQRCodeURL();
        const otp = generateOTP();
        res.json({ dataURL, otp });
    } catch (err) {
        res.status(500).json({ error: 'Error generating QR code and OTP' });
    }
};

exports.verifyotp = (req, res) => {
    const token = req.params.token;
    const verificationResult = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: token,
        window: 1
    });

    if (verificationResult) {
        res.json({ message: 'OTP is valid' });
    } else {
        res.status(400).json({ error: 'OTP is invalid' });
    }
}