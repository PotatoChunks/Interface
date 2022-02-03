const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://<admin>:<admin>@mongodb1.bwdc8.mongodb.net/sample_airbnb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log('连接数据库成功')})
.catch(()=>{console.log('连接数据库失败')})