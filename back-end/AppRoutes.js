const express = require("express")
const router = express.Router()
const TodoRouter = require("./routes/todo")
const PersonRouter = require("./routes/person")

router.use("/todos", TodoRouter);
router.use("/persons", PersonRouter);

module.exports = router;