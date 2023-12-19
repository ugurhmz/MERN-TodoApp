const express = require("express")
const { registerUserController } = require("../controllers/AuthController")
const router = express.Router()


router.post("/register-user", registerUserController)

module.exports = router