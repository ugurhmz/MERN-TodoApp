const mongoose = require("mongoose");
const { Schema } = mongoose;

const PersonSchema = new Schema(
  {
    personMail: {type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    personName: { type: String, required: true },
    personTodos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", PersonSchema);