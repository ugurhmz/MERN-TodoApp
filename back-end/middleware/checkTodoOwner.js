const TodoModel = require("../models/TodoModel")

const checkTodoOwnerShip = async (req,res, next) => {
    try {

        const userId = req._id
        const todoId = req.params.todoId

        // Find  the todo of owner
        const todo = await TodoModel.findById(todoId)
        if(!todo) {
            return res.status(404).json({
                error: "Todo not found!"
            })
        }

        // is logged User ,Todo owner?
        if(todo.todoUser.toString() !== userId){
            return res.status(403).json({ 
                error: "Unauthorized operation!" 
            })
        }

        // Middleware sucessfully passed, go ahead
        next()

    } catch(error) {
        console.log(error)
        res.status(500).json({
            error: "Middleware error !!"
        })
    }
}

module.exports = { checkTodoOwnerShip }