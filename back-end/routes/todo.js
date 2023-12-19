const express = require("express")
const { createTodoController } = require("../controllers/TodoController")
const router = express.Router()


router.post("/create-todo",createTodoController)

module.exports = router