const express = require("express")
const { createTodoController } = require("../controllers/TodoController")
const router = express.Router()
const { checkAuthenticated } = require("../middleware/checkAuth") 

router.post("/create-todo", checkAuthenticated, createTodoController)

module.exports = router
