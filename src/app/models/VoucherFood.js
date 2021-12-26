const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketServiceSchema = new Schema(
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
   
    },
    {
        collection : "ticketService"
    }
);
const customerModel = mongoose.model("ticketService",ticketServiceSchema);
module.exports =  customerModel;