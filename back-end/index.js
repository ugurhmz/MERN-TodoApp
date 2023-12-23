import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import connectDB from './database/db.js'
import appRoutes from './AppRoutes.js'
import cors from 'cors'

// DB 
connectDB()

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// API
app.use('/ugurv1/api', appRoutes);

app.listen(process.env.PORT || 7500, () => {
  console.log(`Listening: ${process.env.PORT}`)
})
