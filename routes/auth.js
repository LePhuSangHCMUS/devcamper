var express = require('express')
var router = express.Router()

//CONTROLLERS
const {registerUser,loginUser,forgotPassword,logout}=require("../controllers/auth")

//===================MAIN================================
router.
route("/register")
.post(registerUser)

router.
route("/login")
.post(loginUser)
router.
route("/forgotpassword")
.post(forgotPassword)
router.
route("/logout")
.get(logout)

 module.exports=router