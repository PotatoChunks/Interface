const mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    //key 以及规则
    user:{type:String,require:true},
    pwd:{type:String,require:true}
});

//用户表
module.exports = mongoose.model("user",userSchema);