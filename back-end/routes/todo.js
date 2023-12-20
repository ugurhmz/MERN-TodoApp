const express = require("express")
const { createTodoController, deleteTodoController } = require("../controllers/TodoController")
const router = express.Router()
const { checkAuthenticated } = require("../middleware/checkAuth") 
const { checkTodoOwnerShip } = require("../middleware/checkTodoOwner")

router.post("/create-todo", checkAuthenticated,createTodoController)
router.delete("/delete/:todoId", checkAuthenticated, checkTodoOwnerShip, deleteTodoController);

module.exports = router
