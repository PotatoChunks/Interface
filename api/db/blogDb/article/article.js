const mongoose = require("mongoose");

require('../27017')
let Schema = mongoose.Schema;
//文章表
let article = mongoose.model("article",new Schema({
  type:{type:String,required: true},//类型
  title:{type:String,required: true},//标题
  content:{type:String,required: true},//markdown解析前内容
  nexContent:{type:String,required: true},//markdown解析后的内容
  outline:{type:String,required: true},//简介
  tag:{type:String,required: true},//标签
  date:{type:Date,default:Date.now},//时间
  //http://localhost:3000
  surface:{type:String,default: "https://s2.loli.net/2022/02/04/BfZhLXGo9rPAvHu.jpg"},//插图
  pv:{type:Number,default:0},//浏览量
  comment:[//关联表
    {type:Schema.Types.ObjectID,ref:"comment"}
  ]
}));
//假数据
/*for (let i=0;i<100;i++) {
  article.create({
    type: ["原创", "转载"][(Math.random() * 2) | 0],
    title: `第${i + 1}篇文章`,
    content: ("" + i + i + i + i + i + "我是文章的内容").repeat(10),
    outline : ("" + i + i + i + i + i + "我是文章的内容").repeat(3),
    tag: ["个人日记","Html5&Css3","JavaScript","Node.js","Vue&React","其他"][(Math.random() * 6) | 0],
    pv:(Math.random() * 1000 | 0),
  });
}*/
// article.create({
//     type: ["原创", "转载"][(Math.random() * 2) | 0],
//     title: `第104篇文章`,
//     content: ("qqq我是文章的内容").repeat(10),
//     tag: ["个人日记","Html5&Css3","JavaScript","Node.js","Vue&React","其他"][(Math.random() * 6) | 0],
//     pv:(Math.random() * 1000 | 0),
//   });
module.exports = article;
