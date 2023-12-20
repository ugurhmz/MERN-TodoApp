const TodoModel   = require("../models/TodoModel")
const UserModel = require("../models/UserModel")

exports.createTodoController = async (req,res) => {
    try {
        const { todoTitle, todoDesc } = req.body
        const userId = req.userId
        console.log("myuserId", req.userId)
        const findUser = await UserModel.findById(userId)
        if (!findUser) {
            return res.status(404).json({ error: "User not found" })
        }

        // create new todo
        const newTodo = TodoModel({ todoTitle, todoUser: findUser._id, todoDesc })

        // check Todo owner 
        if(newTodo.todoUser.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized operation" })
        }

        const savedTodo = await newTodo.save()
        // User modelindeki userTodos alanına eklenen todo'nun ID'sini ekle
        findUser.userTodos.push(savedTodo._id)
        await findUser.save();

        res.status(201).json(savedTodo)

    } catch(err) {
        console.error(err)
        res.status(500).json({ err: "Todo creation failed" })
    }
}