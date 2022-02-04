const mongoose = require("mongoose");
//tag表,标签表,方便管理
require('../27017')
let articleInfo = mongoose.model("articleInfo",new mongoose.Schema({
  tags:[String],
  num:Number
}));

/*articleInfo.create({
  tags:["个人日记","Html5&Css3","JavaScript","Node.js","Vue&React","其他"],
  num:100
});*/

module.exports = articleInfo;