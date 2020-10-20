const express = require('express');
require ('./mongodb');
const mongoose= require('mongoose')

const signup = mongoose.Schema({
    "email":{type:String},
    "name":{type:String},
    "password":{type:String},
    "token":{type:String}

})
module.exports= mongoose.model('signUp',signup);
