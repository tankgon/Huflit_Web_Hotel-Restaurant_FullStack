const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billRoomSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        Room :[
            {
                idRoom {type : String , required : true }, 
                 
            }
        ],
        totalMoney : {type : Number, required : true  }
        
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("billService",billServiceSchema);
module.exports =  customerModel;