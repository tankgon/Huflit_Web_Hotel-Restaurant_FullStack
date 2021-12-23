// cài đặt mongoose kết nổi qua 
const mongoose = require('mongoose');
// cài đặt schema 
const Schema = mongoose.Schema;
// cài đặt mongoose slug 
const slug = require('mongoose-slug-generator');
// cài đặt mongoose-delete để softdelete
const mongooseDelete = require('mongoose-delete')

const customerSchema = new Schema(
    {

        name : { type : String , required : true }, 
        cmnd : { type : Number , required : true }, 
        phone : { type : Number , required : true}, 
        address : { type :  String , required : true},
        slug: { type: String, slug: "name", unique: true },
    },
    {
        timestamps: true,
      }
);
// region add plugin
// cài đặt  mongoose slug
mongoose.plugin(slug);
// cài đặt mongooseDelete SOFTDELETE
// thực hiện override method delete 
// để nó mất đi trên trang 
// deleteAt để hiển thị thời gian deleted
customerSchema.plugin(mongooseDelete, {
  overrideMethods: true,
  deletedAt: true
});



module.exports = mongoose.model('customer', customerSchema);