const TodoModel   = require("../models/TodoModel")
const UserModel = require("../models/UserModel")

exports.createTodoController = async (req,res) => {
    try {
        const { todoTitle, todoDesc } = req.body
        const userId = req._id

        const findPerson = await UserModel.findById(userId)
        if (!person) {
            return res.status(404).json({ error: "User not found" })
        }

        // create new todo
        const newTodo = TodoModel({ todoTitle, todoPerson: findPerson._id, todoDesc })

        // check Todo owner 
        if(newTodo.todoPerson.toString() !== userId) {
            return res.status(403).json({ error: "Unauthorized operation" })
        }

        const savedTodo = await newTodo.save()
        // Person modelindeki personTodos alanına eklenen todo'nun ID'sini ekle
        findPerson.personTodos.push(savedTodo._id)
        await person.save();

        res.status(201).json(savedTodo)

    } catch(err) {
        console.error(err)
        res.status(500).json({ err: "Todo creation failed" })
    }
}