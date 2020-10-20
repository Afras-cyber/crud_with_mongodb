const mongoose= require('mongoose');
require("./mongodb");

const schem=mongoose.Schema({
    model:{
        type:String
    },
    color:{
        type:String
    },
    brand:{
        type:String
    },
    owner:{
        type:String
    }
})
module.exports=mongoose.model('Car',schem);
