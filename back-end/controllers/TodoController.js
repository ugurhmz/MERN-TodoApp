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