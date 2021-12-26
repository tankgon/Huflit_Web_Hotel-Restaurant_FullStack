const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billFoodSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        Food :[
            {
                nameFood : { type : String , required : false}, 
                price : { type : Number , required : false }, 
                amount : { type : Number , required : false }, 
                IntoMoney :{ type : Number , required : false }, 
          }
        ],
        totalMoney : {type : Number, required : true  }
        
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("billFood",billServiceSchema);
module.exports =  customerModel;