const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billFoodSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        Food :[
            {
                idFood : {type: String , required : true },
                totalMoneyFood : {type : Number , required : true }
          }
        ],
        totalMoney : {type : Number, required : true  }
        
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("billFood",billFoodSchema);
module.exports =  customerModel;