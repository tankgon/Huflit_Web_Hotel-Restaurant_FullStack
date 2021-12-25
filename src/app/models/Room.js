// cài đặt mongoose kết nổi qua 
const mongoose = require('mongoose');
// cài đặt schema 
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    name :{ type: String, required: true }, 
    price : { type: Number, required: true },
    type : { type:String ,required: true},
    floor :{type:Number,required:true},
    device :[
        {
        namedevice : {type : String, required: true}, 
        pricedevice : {type:Number,required:true},
        qty:{type:Number, required:true}, 
        }
    ],
    status : {type : Boolean , required : true }, 
},
{
    collection : "room"
});
const accountModel = mongoose.model("room",roomSchema)
module.exports = accountModel