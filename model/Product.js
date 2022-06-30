const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductShema = new Schema({
    productName:{type:String,trim:true,required:true},
    cost:{type:Number,required:true},
    takhfif:{type:Number,required:true},
    meqdarMojoodi:{type:Number,required:true},
    description:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdAt:{type:Date,default:Date.now()}
});

const Product = mongoose.model('Product', ProductShema);

module.exports = Product;