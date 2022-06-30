const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Usershema = new Schema({
    fullName:{type:String,trim:true,required:true},
    mobile:{type:Number,required:true},
    password:{type:String,required:true},
    description:{type:String},
    createdAt:{type:Date,default:Date.now()}
});

const User = mongoose.model('User', Usershema);

module.exports = User;