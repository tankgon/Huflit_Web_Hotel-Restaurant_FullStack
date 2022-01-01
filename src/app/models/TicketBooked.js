const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketBookedSchema = new Schema(
    {
        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        dateArrive:{type : Date , required:true },
        dateGo :{type : Date , required:true},
        Room : {idRoom :{type : String,required:true}},
        moneyPay : {type:Number , String,required:true}
   
    },
    
    // {
    //     timestamps: true,
    //   }
);
const customerModel = mongoose.model("ticketBooked",ticketBookedSchema);
module.exports =  customerModel;