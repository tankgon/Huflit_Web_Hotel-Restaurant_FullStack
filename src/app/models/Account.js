// cài đặt mongoose kết nổi qua 
const mongoose = require('mongoose');
// cài đặt schema 
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    username :{ type: String, required: true }, 
    password : { type: String, required: true },
    role : { type:String ,required: true}
},
{
    collection : "account"
});
const accountModel = mongoose.model("account",accountSchema)
module.exports = accountModel