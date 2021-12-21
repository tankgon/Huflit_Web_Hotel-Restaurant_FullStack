const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketServiceSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        phone : { type : Number , required : true}, 
        address : { type :  String , required : true},
        nameService : { type : String , required : true }, 
        price : { type : Number , required : true }, 
        amount : { type : Number , required : true }, 
        IntoMoney :     { type : Number , required : true }, 
   
    },
    {
        collection : "ticketService"
    }
);
const customerModel = mongoose.model("ticketService",ticketServiceSchema);
module.exports =  customerModel;