const mongoose = require("mongoose");
const moDb = require('./27017')
//
let Schema = mongoose.Schema;
//评论表
module.exports = mongoose.model("comment",new mongoose.Schema({
  //关联用户表
  user : {type:Schema.Types.ObjectId , ref:"user" , required:true},
  //留言内容
  content : {type:String,required: true},
  //日期
  date : {type:Date,default:Date.now},
  //子留言
  children:[
    {
      //子留言 用户
      user : {type:Schema.Types.ObjectId , ref:"user" , required:true},
      //子留言 内容
      content : {type:String,required: true},
      //子留言评论对象
      fUser:{type:Schema.Types.ObjectId,required: true},
      //子留言 日期
      date : {type:Date,default:Date.now}
    }
  ]
}));