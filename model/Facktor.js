const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FacktortShema = new Schema({
    productName:{type:String,trim:true,required:true},
    cost:{type:Number,required:true},
    takhfif:{type:Number,required:true},
    meqdarMojoodi:{type:Number,required:true},
    description:{type:String},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    createdAt:{type:Date,default:Date.now()}
});

const Facktor = mongoose.model('Facktor', FacktortShema);

module.exports = Facktor;