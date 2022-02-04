const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

//连接数据库
mongoose.connect("mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/blog?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(b=>{console.log('数据库连接成功')})
    .catch(e=>{
      console.log("连接失败");

      //错误写入
      //fs.writeFile(path.join(__dirname,'../../public/errLog.txt'),'数据库链接\t'+new Date()+'\n\n'+e+'\r\n\n\r',{flag:"a"},(err)=>{});
    });
