//显示在前端的友链
const mongoose = require("mongoose");
const moDb = require('../27017')
//友链表
module.exports = mongoose.model("link",new mongoose.Schema({
  name:{type:String,require:true},//名称
  href:{type:String,require:true},//链接
  //http://localhost:3000
  img:{type:String,default:"https://s2.loli.net/2022/02/04/WJxMTFo6Cu3YI1S.jpg"},//图片
  date:{type:Date,default:Date.now},//时间
//描述
  describe:{type:String}
}));
