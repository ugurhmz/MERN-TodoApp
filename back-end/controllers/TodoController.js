const { default: mongoose } = require("mongoose")
const TodoModel   = require("../models/TodoModel")
const UserModel = require("../models/UserModel")

// Create TODO
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


// Delete TODO
exports.deleteTodoController = async (req,res) =>{
    try {
        const todoId = req.params.todoId
        const userId = req.userId

        console.log("todoId", todoId)
        console.log("userId", userId)

        // Check if todoId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ error: "Invalid todoId!" });
        }

        const findTodo = await TodoModel.findById(todoId)
        console.log("findTodo", findTodo)
        console.log("toString()", findTodo.todoUser.toString())


        if(!findTodo) {
            return res.status(404).json({
                error:"Todo not found!"
            })
        }

        if(findTodo.todoUser.toString() !== userId){
            return res.status(403).json({ error: "Unauthorized operation!" });
        }

        const findUser = await UserModel.findById(userId)
        if(findUser){
            findUser.userTodos = findUser.userTodos.filter(todo => todo.toString() !== todoId)
            await findUser.save()
        }

        await TodoModel.deleteOne({ _id: todoId });
        res.status(200).json({ message: "Todo deleted successfully" });

    } catch(err) {
        console.error(err)
        res.status(500).json({ error: "Todo deletion failed" })
    }
}

// Update TODO
exports.updateTodoController = async ( req,res) => {
    try {
         const todoId = req.params.todoId
         const userId = req.userId
         const { todoTitle, todoDesc } = req.body

         if(!mongoose.Types.ObjectId.isValid(todoId)){
            return res.status(400).json({error:"Invalid todoId!"}
            )
         }

         const findTodo = await TodoModel.findById(todoId)

         if(!findTodo){
            return res.status(404).json({eror:"Todo not found!"})
         }

         // Chekc if the user owner of the todo ?
         if(findTodo.todoUser.toString() !== userId){
            return res.status(404).json({error:"Unauthorized operation!"})
         }


         findTodo.todoTitle = todoTitle || findTodo.todoTitle
         findTodo.todoDesc  = todoDesc || findTodo.todoDesc

         const updatedTodo = await findTodo.save()

         res.status(200).json({
            message: "Update successful",
            updatedTodo
         })

    } catch(err) {
        res.status(500).json(err)
    }
}