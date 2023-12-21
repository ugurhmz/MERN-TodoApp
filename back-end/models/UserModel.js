const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userMail: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    userName: { type: String, required: true },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    resetPasswordToken: { type: String ,default: null},
    resetPasswordExpiry: { type: Date,default: null },
    userTodos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todo" }],
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema);
