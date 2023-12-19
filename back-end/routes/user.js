const express = require("express")
const { registerUserController, loginUserController } = require("../controllers/AuthController")
const router = express.Router()


router.post("/register-user", registerUserController)
router.post("/login-user", loginUserController)

module.exports = router