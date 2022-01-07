const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billAccident = new Schema(
    {
        cmnd : {type:Number , required : true },
        name : {type:String , required : true },
        nameRoom : {type : String , required : true },
        device : [],
        total:{type:Number , required : true }
        
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("billaccident",billAccident);
module.exports =  customerModel;