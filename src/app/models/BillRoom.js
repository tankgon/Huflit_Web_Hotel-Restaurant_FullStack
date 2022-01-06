const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billRoom = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        bill :[],
       total : {type : Number, required : true  },
       
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("billRoom",billRoom);
module.exports =  customerModel;