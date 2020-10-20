const express = require('express');
const mongoose = require('mongoose');
require('../mongodb/mongodb');
const Car = require('../mongodb/mongoSchema');
const app = express();

app.use(express.json());

const network=async()=>{

    try{
        app.post(('/create'),(req,res)=>{
            const carOne = await new Car({
                model:req.body.name,
                color:req.body.color,
                brand:req.body.brand,
                owner:req.body.owner
            })
            const postData=await carOne.save();
            res.status(200).json(postData);
        })
    }catch(e){console.log(e);}
    
   

}
module.exports.network=network;