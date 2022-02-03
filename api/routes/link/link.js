/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

//const mongodb = require("./db");

const mongoose = require("mongoose");

let client = mongoose.connect("mongodb+srv://<admin>:<admin>@mongodb1.bwdc8.mongodb.net/sample_airbnb?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})

let Schema = mongoose.Schema;//准备建表
let userSchema = new Schema({
    //key 以及规则
    username : {type:String,required:true},//必须有username
    password : {type:String,required:true}
})
let user = mongoose.model("user",userSchema)



//
router.get("/",async (req,res)=>{
    user.create({
        username:"aaa",
        password:"bbb"
    }).then(d=>{
        console.log("成功")
        res.send({
            code:0,
            msg:"成功"
        })
        return
    }).catch(e=>{
        console.log("失败")
        res.send({
            code:1,
            msg:"失败"
        })
        return
    })
    res.send({
        code:500,
        msg:"无法连接数据库"
    })
})


module.exports = router