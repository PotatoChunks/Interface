const mongoose = require("mongoose");
const crypto = require("crypto");

const moDb = require('./27017')
let userSchema = new mongoose.Schema({
  user:{type:String,require:true},
  pwd:{type:String,require:true},
  //注册时间
  userDate:{type:Date,default:Date.now},
  //头像     http://localhost:3000
  photo : {type:String,default:"https://s2.loli.net/2022/02/04/WJxMTFo6Cu3YI1S.jpg"},
  //是否权限禁用
  disabled : {type:Boolean,default: false},
  //是否是管理员
  admin : {type:Boolean,default:false}

})
//中间件
//密码加密
userSchema.pre('save',function (next) {
  /*密码加密*/
  let pwd = this.pwd;
  //加密
  this.pwd = crypto.createHash("sha256").update(pwd).digest("hex");
  //
  next();
})

//用户表
module.exports = mongoose.model("user",userSchema);
