const express= require('express');
const mongoose = require('mongoose');
const mongoDbConnection = require('./mongodb')
const app = express();

app.get(('/'),(req,res)=>{
    res.json("Hello world");
})

const PORT = process.env.PORT || 2500;
app.listen(PORT,()=>{
    console.log("port connected")
})
