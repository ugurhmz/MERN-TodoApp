import express from 'express';
const router = express.Router();
import {
  createTodoController,
  deleteTodoController,
  updateTodoController,
  getAllTodosController,
  getTodoThatUserController
} from '../controllers/TodoController.js'
import { checkAuthenticated } from '../middleware/checkAuth.js';
import { checkTodoOwnerShip } from '../middleware/checkTodoOwner.js';

router.get("/all-todos", getAllTodosController);
router.get("/user-todo", checkAuthenticated, getTodoThatUserController);
router.post("/create-todo", checkAuthenticated, createTodoController);
router.delete("/delete/:todoId", checkAuthenticated, checkTodoOwnerShip, deleteTodoController);
router.put("/update/:todoId", checkAuthenticated, checkTodoOwnerShip, updateTodoController);

export default router;
