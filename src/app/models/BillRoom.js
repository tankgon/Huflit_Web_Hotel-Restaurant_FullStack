const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billRoomSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        Room :
            {
                idRoom :{type : String , required : true }
         } ,
        dateArrive:{type : Date , required:true},
        dateGo :{type : Date , required:true},
        totalMoney : {type : Number, required : true  },
       
    },
    
    {
        timestamps: true,
      }
);
const customerModel = mongoose.model("billRoomSchema",billRoomSchema);
module.exports =  customerModel;