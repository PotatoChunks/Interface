/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

//const mongodb = require("../../db/db");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/admin?retryWrites=true&w=majority";

const userDB = require('../../db/user')

//
router.get("/",async (req,res)=>{
    let {user,pwd} = req.query;
    userDB.create({user,pwd})
        .then(d=>{
            res.send({
                code : 0,
                msg : '注册成功'
            })
        })
        .catch(e=>{
            console.log(e)
            res.send({
                code : 4,
                msg: '服务器错误'
            })
        })
})


module.exports = router