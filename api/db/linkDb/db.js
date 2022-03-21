const mongoose = require("mongoose");
mongoose.disconnect();
//连接数据库
mongoose.connect("mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/link_db?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(b=>{console.log('数据库连接link_db成功')})
    .catch(e=>{
        console.log("连接link_db失败");
    });
//测试
//mongodb+srv://!:!!!@mongodb1.bwdc8.mongodb.net/link_db?retryWrites=true&w=majority
