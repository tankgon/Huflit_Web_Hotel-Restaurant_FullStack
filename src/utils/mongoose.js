module.exports={
    // xử lý arrray 
    multipleMongooseToObject : function(mongoArrays)
    {
        return mongoArrays.map(mongoose => mongoose.toObject()); 
    },
    // xủ 1 một document
    mongooseToObject:function(mongoose)
    {
        return mongoose ? mongoose.toObject():mongoose;
    }
}