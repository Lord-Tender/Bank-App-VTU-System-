const express = require('express');
const app = express();
require('dotenv').config()
const port = process.env.PORT;
const uri = process.env.URI
let cors = require('cors')
const mongoose = require('mongoose');
const userRouter = require("./Routes/user.Route")

app.use(cors())
app.use(express.json({ limit: '20mb' }))
app.use('/user', userRouter)


app.listen(port, ()=>{
    console.log(`Server is running at http://localhost:${port}`);
    mongoose.connect(uri)
    .then(()=>{
        console.log("Connected to MongoDB");
    })
    .catch((err)=>{
        console.log(err);
    })
})