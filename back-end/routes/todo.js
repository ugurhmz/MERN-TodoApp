const express = require("express")
const { createTodoController } = require("../controllers/TodoController")
const router = express.Router()


router.post("/create-todo",createTodoController)
//router.get("/all-todos", getAllTodosController)

module.exports = router