const express = require('express')
const app = express()
const errorHandler = require('./Middlewares/errorHandler')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('express-async-errors')
const mongoose = require('mongoose')
const userRouer = require('./Routes/user')
const cors =require('cors')
app.use(express.static('public'))
app.use(cookieParser())
app.use(errorHandler)
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use('/api/v1/user', userRouer)
const start = async () =>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        await app.listen(6000)
        console.log('App is working on port 6000')
    }catch (e) {
        console.log(e)
    }

}

start()


