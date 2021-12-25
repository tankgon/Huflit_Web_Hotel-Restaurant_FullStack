const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bill = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        billFood: {
                idFood : {type : String ,required : true }, 
                totalMoneyFood :{type : Number , required : true } 
        },
        billService : { 
            idService : { type : String , required : true},
            totalMoneyService : { type : Number , required : true }, 
        },
        billTrouble : { 
            idTrouble : { type : String , required  : true }, 
            totalMoneyService : {type : Number , required : true }
        },
        bill
            
        

        totalMoney : {type : Number, required : true  }
        
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("bill",bill);
module.exports =  customerModel;