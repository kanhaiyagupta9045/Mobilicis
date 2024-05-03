const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }))

router.use(express.json())

const registerController = require('../controllers/registerController')
const verifyController = require('../controllers/verifyOTP');
const { login } = require('../controllers/login');
const { generateOtp, verifyotp } = require('../controllers/2fa');

router.post('/register/user',registerController.registerUser)
router.post("/login",login)
router.post('/verify/otp',verifyController.VerifyOTP)
router.get("/2fa/generate-otp",generateOtp)
router.post("/2fa/verify/:token", verifyotp)

module.exports = router