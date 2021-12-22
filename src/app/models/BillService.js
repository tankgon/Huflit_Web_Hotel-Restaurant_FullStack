const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billServiceSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        service :[
            {
                nameService : { type : String , required : false}, 
                price : { type : Number , required : false }, 
                amount : { type : Number , required : false }, 
                IntoMoney :{ type : Number , required : false }, 
          }
        ],
        totalMoney : {type : Number, required : true  }
        
    },
    {
        collection : "billService"
    }
);
const customerModel = mongoose.model("billService",billServiceSchema);
module.exports =  customerModel;