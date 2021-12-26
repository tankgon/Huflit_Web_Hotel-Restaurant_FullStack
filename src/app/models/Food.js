// cài đặt mongoose kết nổi qua 
const mongoose = require('mongoose');
// cài đặt schema 
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    name :{ type: String, required: true }, 
    price : { type: Number, required: true },
},
{
    collection : "food"
});
const accountModel = mongoose.model("food",foodSchema)
module.exports = accountModel