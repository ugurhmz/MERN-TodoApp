const express = require('express')
const app = express()
const dotenv = require("dotenv")
const cors = require('cors')

dotenv.config()

app.use(cors())
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Hello World , UGur hmz")
})

app.listen(process.env.PORT || 3500, () => {
    console.log(`Listening: ${process.env.PORT}`);
})
