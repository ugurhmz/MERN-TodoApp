const mongoose = require("mongoose")
const { Schema } = mongoose


const PersonSchema = new Schema(

    {
        personName: {type: String, required: true},
        personTodos: [{type: mongoose.Schema.Types.ObjectId, ref: "Todo"}],

    },
    {timestamps: true}

)

module.exports = mongoose.model("Person",PersonSchema)