const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
    {

        name : { type : String , required : true }, 
        price : { type : Number , required : true }, 
   
    },
    {
        collection : "service"
    }
);
const customerModel = mongoose.model("service",serviceSchema);
module.exports =  customerModel;