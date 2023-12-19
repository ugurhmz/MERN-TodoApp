const express = require("express")
const { createTodoController, getAllTodosController } = require("../controllers/TodoController")
const router = express.Router()


router.post("/create-todo",createTodoController)
router.get("/todos", getAllTodosController)

module.exports = router