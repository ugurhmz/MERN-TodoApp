const express = require("express")
const { createTodoController, deleteTodoController, updateTodoController,getAllTodosController } = require("../controllers/TodoController")
const router = express.Router()
const { checkAuthenticated } = require("../middleware/checkAuth") 
const { checkTodoOwnerShip } = require("../middleware/checkTodoOwner")

router.get("/all-todos",getAllTodosController)
router.post("/create-todo", checkAuthenticated,createTodoController)
router.delete("/delete/:todoId", checkAuthenticated, checkTodoOwnerShip, deleteTodoController)
router.put("/update/:todoId", checkAuthenticated, checkTodoOwnerShip,updateTodoController)

module.exports = router
