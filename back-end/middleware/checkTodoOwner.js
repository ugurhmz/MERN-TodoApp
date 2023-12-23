import mongoose from 'mongoose';
import TodoModel from '../models/TodoModel.js'

export const checkTodoOwnerShip = async (req, res, next) => {
  try {
    console.log("Ship->req.userId", req.userId);
    const userId = req.userId;
    const todoId = req.params.todoId;

    if (!mongoose.isValidObjectId(todoId)) {
      return res.status(400).json({
        error: "Invalid todoId format",
      });
    }

    // Find the todo of owner
    const todo = await TodoModel.findById(todoId);
    if (!todo) {
      return res.status(404).json({
        error: "Todo not found!",
      });
    }

    // Is logged User the Todo owner?
    if (todo.todoUser.toString() !== userId) {
      return res.status(403).json({
        error: "Unauthorized operation!",
      });
    }

    // go ahead
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Middleware error !!",
    });
  }
};
