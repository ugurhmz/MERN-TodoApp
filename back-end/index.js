const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require('cors')
const connectDB = require('./database/db')


dotenv.config()

// DB 
connectDB()

app.use(cors())
app.use(express.json())

// Main Route
app.use("/ugurv1/api", appRoutes)


app.listen(process.env.PORT || 3500, () => {
    console.log(`Listening: ${process.env.PORT}`);
})
