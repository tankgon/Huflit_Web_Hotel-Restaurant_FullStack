const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {

        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        phone : { type : Number , required : true}, 
        address : { type :  String , required : true},
        note : {type: String , required : true}
    },
    {
        collection : "customer"
    }
);
const customerModel = mongoose.model("customer",customerSchema);
module.exports =  customerModel;