import express from 'express';
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv';

import connectDB from './config/db.js'

import userRoutes from'./routers/userRoutes.js';
import courseRoutes from'./routers/courseRoutes.js';
import sessionRoutes from'./routers/sessionRoutes.js';





import morgan from 'morgan'

import { NotFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config() 

connectDB() 

const app = express()


  app.use(morgan('dev'))





app.use(cors())
app.use(express.json({limit: '50mb', extended: true}))
app.use(express.urlencoded({limit: '50mb', extended: true})) 





app.use('/api/users', userRoutes) 
app.use('/api/courses', courseRoutes)
app.use('/api/sessions', sessionRoutes) 





  app.get('/', (req, res) => {
    res.send('API is running....')
  })



app.use(NotFound)
 
app.use(errorHandler)

const PORT = process.env.PORT || 4000 

app.listen(PORT, console.log(`server runing in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))