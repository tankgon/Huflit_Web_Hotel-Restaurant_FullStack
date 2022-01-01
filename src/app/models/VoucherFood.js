const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketFoodSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        phone : { type : Number , required : true}, 

        Food :[
            {
                nameFood : { type : String , required : false}, 
                price : { type : Number , required : false }, 
                amount : { type : Number , required : false }, 
                IntoMoney :{ type : Number , required : false }, 
          }
        ],
        totalMoney : {type : Number , required:true}
   
    },
    {
        collection : "ticketFood"
    }
);
const customerModel = mongoose.model("ticketFood",ticketFoodSchema);
module.exports =  customerModel;