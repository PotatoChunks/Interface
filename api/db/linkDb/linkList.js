const mongoose = require("mongoose");
require('./db');

let linkSchema = new mongoose.Schema({
    title:{type:String,required:true},
    //描述
    describe:{type:String},
    //注册时间
    linkData:{type:Date,default:Date.now},
    //是否禁用
    disabled : {type:Boolean,default: false},
    //链接
    href:{type:String,require:true}

})

//链接表
module.exports = mongoose.model("list",linkSchema);