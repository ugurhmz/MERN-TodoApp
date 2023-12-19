const TodoModel = require("../models/TodoModel")


// CREATE TODO
exports.createTodoController = async (req,res) => {
    const newTodo = new TodoModel(req.body)

    try {
        const savedTodo = await newTodo.save()
        res.status(200).json(savedTodo)
    } catch(err) {
        res.status(500).json(err)
    }
}

// GET ALL TODOS
exports.getAllTodosController = async (req,res) => {
    try {
        const allTodos = await TodoModel.find()
        .populate({
            path:"todoPerson",
            select:"personName"
        })

        res.status(200).json(allTodos)

    } catch(err) {
        res.status(500).json(err)
    }
}