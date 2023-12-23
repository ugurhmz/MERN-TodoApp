const express = require('express');
const app = express();
const dotenv = require('dotenv');

const connectDB = require('./database/db');
const appRoutes = require('./AppRoutes');
const cors = require('cors');
app.use(cors())
dotenv.config()

// DB 
connectDB()

app.use(express.json())


app.use('/ugurv1/api', appRoutes);

app.listen(process.env.PORT || 7500, () => {
  console.log(`Listening: ${process.env.PORT}`)
})
