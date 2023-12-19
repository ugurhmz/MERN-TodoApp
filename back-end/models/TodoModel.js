const mongoose = require("mongoose")
const { Schema } = mongoose

const TodoSchema = new Schema(
    {
        todoTitle: {type: String, required: true},
        todoPerson: {type: mongoose.Schema.Types.ObjectId, ref: "Person", required: true},
        todoDesc: {type: String}
    },
    {timestamps: true}
)

module.exports = mongoose.model("Todo",TodoSchema)