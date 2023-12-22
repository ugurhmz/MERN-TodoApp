const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./database/db');
const appRoutes = require('./AppRoutes');

dotenv.config()

// DB 
connectDB()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3005', // React uyg
  credentials: true,
}))


app.use('/ugurv1/api', appRoutes);

app.listen(process.env.PORT || 7500, () => {
  console.log(`Listening: ${process.env.PORT}`)
})
