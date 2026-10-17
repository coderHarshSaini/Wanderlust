const express = require("express")
const router = express.Router()
const wrapAsync=require("../utils/wrapAsync")
const { saveRedirectUrl } = require("../middleware")
const passport = require("passport")
const userController=require("../controllers/users")

router.route("/signUp")
.get(userController.renderSignUpForm)
.post(wrapAsync(userController.signUp))

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{ failureRedirect: '/login', failureFlash:true }),
    wrapAsync(userController.login))

router.get("/logout",userController.logout)

module.exports=router;