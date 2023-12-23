import express from 'express';
const router = express.Router();
import TodoRouter from './routes/todo.js'
import UserRouter from './routes/user.js' 

router.use("/todos", TodoRouter);
router.use("/users", UserRouter);

export default router;
