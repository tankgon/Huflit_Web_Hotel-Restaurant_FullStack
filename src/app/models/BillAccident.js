const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billAccident = new Schema(
    {
        nameRoom : {type : String , required : true },
        device : [
            {
                nameDevice : {type : String, required: true}, 
                priceDevice : {type:Number,required:true},
                qtyAccident:{type:Number, required:true}, 
                intoMoney : {type:Number,required : true }
            },
        ],
        totalMoney:{type:Number , required : true }
        
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("billaccident",billAccident);
module.exports =  customerModel;