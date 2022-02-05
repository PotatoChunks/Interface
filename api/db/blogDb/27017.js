const mongoose = require("mongoose");
mongoose.disconnect();

//连接数据库
mongoose.connect("mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/blog_db?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(b=>{console.log('数据库连blog_d接成功')})
    .catch(e=>{
        console.log("连接blog_d失败");
    });
//mongodb+srv://!:!!!@mongodb1.bwdc8.mongodb.net/blog_db?retryWrites=true&w=majority
