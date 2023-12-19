const express = require("express")
const { createPersonController } = require("../controllers/PersonController")
const router = express.Router()


router.post("/create-person",createPersonController)

module.exports = router