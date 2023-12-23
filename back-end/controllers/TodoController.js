import mongoose from 'mongoose';
import TodoModel from '../models/TodoModel.js';
import UserModel from '../models/UserModel.js';

// GET ALL TODOS
export const getAllTodosController = async (req, res) => {
  try {
    const allTodos = await TodoModel.find()
      .populate({
        path: "todoUser",
        select: "userMail userName",
      });
    res.status(200).json(allTodos);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// GET ONE TODO FOR USER
export const getTodoThatUserController = async (req, res) => {
  try {
    const userTodos = await TodoModel.find({ todoUser: req.userId })
      .populate({
        path: "todoUser",
        select: "userName",
      });

    if (userTodos.length === 0) {
      return res.status(204).json({
        message: "No todos found for the user",
      });
    }

    res.status(200).json({
      userTodos,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


// CREATE TODO
export const createTodoController = async (req, res) => {
  try {
    const { todoTitle, todoDesc } = req.body;
    const userId = req.userId;
    console.log("myuserId", req.userId);
    const findUser = await UserModel.findById(userId);
    if (!findUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // create new todo
    const newTodo = TodoModel({ todoTitle, todoUser: findUser._id, todoDesc });

    // check Todo owner
    if (newTodo.todoUser.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized operation" });
    }

    const savedTodo = await newTodo.save();
    findUser.userTodos.push(savedTodo._id);
    await findUser.save();

    res.status(201).json(savedTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Todo creation failed" });
  }
};

// DELETE TODO
export const deleteTodoController = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.userId;

    console.log("todoId", todoId);
    console.log("userId", userId);

    // Check if todoId is a valid ObjectId
    if (!mongoose.isValidObjectId(todoId)) {
      return res.status(400).json({ error: "Invalid todoId!" });
    }

    const findTodo = await TodoModel.findById(todoId);
    console.log("findTodo", findTodo);
    console.log("toString()", findTodo.todoUser.toString());

    if (!findTodo) {
      return res.status(404).json({
        error: "Todo not found!",
      });
    }

    if (findTodo.todoUser.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized operation!" });
    }

    const findUser = await UserModel.findById(userId);
    if (findUser) {
      findUser.userTodos = findUser.userTodos.filter((todo) => todo.toString() !== todoId);
      await findUser.save();
    }

    await TodoModel.deleteOne({ _id: todoId });
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Todo deletion failed" });
  }
};

// UPDATE TODO
export const updateTodoController = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    const userId = req.userId;
    const { todoTitle, todoDesc } = req.body;

    if (!mongoose.isValidObjectId(todoId)) {
      return res.status(400).json({ error: "Invalid todoId!" });
    }

    const findTodo = await TodoModel.findById(todoId);

    if (!findTodo) {
      return res.status(404).json({ eror: "Todo not found!" });
    }

    // Check if the user is the owner of the todo
    if (findTodo.todoUser.toString() !== userId) {
      return res.status(404).json({ error: "Unauthorized operation!" });
    }

    findTodo.todoTitle = todoTitle || findTodo.todoTitle;
    findTodo.todoDesc = todoDesc || findTodo.todoDesc;

    const updatedTodo = await findTodo.save();

    res.status(200).json({
      message: "Update successful",
      updatedTodo,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
