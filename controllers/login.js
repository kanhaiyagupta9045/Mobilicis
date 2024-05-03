const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.login = async (req, res) => {
   const { email, password } = req.body;
   const user = await User.findOne({ email: email })
   if (!user) {
      return res.status(404).json({ message: "Invalid email" })
   }
   const isPasswordMatch = await bcrypt.compare(password, user.password)
   if (!isPasswordMatch) {
      return res.status(404).json({ message: "Invalid Password" })
   }
   const payload = { email: user.email }
   const signature = await jwt.sign(payload, "thisissecret")
   res.status(200).json({ token: signature })
}