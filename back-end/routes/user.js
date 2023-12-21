const express = require("express")
const { registerUserController, loginUserController, resetPasswordController, resetPasswordLinkController } = require("../controllers/AuthController")
const router = express.Router()


router.post("/register-user", registerUserController)
router.post("/login-user", loginUserController)
router.post("/reset-password", resetPasswordController)  // kullanıcıya reset linkini gönderir
router.get("/reset-password", resetPasswordLinkController)  //  kullanıcı reset linkine tıkladığında işlemi gerçekleştirir

module.exports = router