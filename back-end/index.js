const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require('cors')
const connectDB = require('./database/db')
const todoRoute = require("./routes/todo.js")
const personRoute = require("./routes/person.js")

dotenv.config()

// DB 
connectDB()

app.use(cors())
app.use(express.json())

// REQUEST
app.use("/ugurv1", todoRoute)
app.use("/ugurv1", personRoute)


app.listen(process.env.PORT || 3500, () => {
    console.log(`Listening: ${process.env.PORT}`);
})
