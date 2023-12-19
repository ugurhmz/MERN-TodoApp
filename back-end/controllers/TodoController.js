const TodoModel = require("../models/TodoModel")

exports.createTodoController = async (req,res) => {
    const newTodo = TodoModel(req.body)

    try {
        const savedTodo = await newTodo.save()
    } catch(err) {
        res.status(500).json(err)
    }
}