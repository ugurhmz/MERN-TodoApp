const express = require("express")
const router = express.Router()
const TodoRouter = require("./routes/todo")
const UserRouter = require("./routes/user")

router.use("/todos", TodoRouter);
router.use("/users", UserRouter);

module.exports = router;