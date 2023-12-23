const express = require("express")
const { registerUserController, loginUserController, resetPasswordController, resetPasswordLinkController, logOutController } = require("../controllers/AuthController")
const { checkAuthenticated } = require("../middleware/checkAuth")
const router = express.Router()


router.post("/register-user", registerUserController)
router.post("/login-user", loginUserController)
router.post("/reset-password", resetPasswordController)  // kullanıcıya reset linkini gönderir
router.get("/reset-password", resetPasswordLinkController)  //  kullanıcı reset linkine tıkladığında, random pw'yi setler.
router.post("/logout", checkAuthenticated, logOutController)

module.exports = router