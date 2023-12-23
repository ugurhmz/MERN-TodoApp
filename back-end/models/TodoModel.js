import mongoose from 'mongoose';

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    todoTitle: { type: String, required: true },
    todoUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    todoDesc: { type: String },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', TodoSchema);
export default Todo;
