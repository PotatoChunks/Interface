/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

//const mongodb = require("./db");




//
router.get("/",async (req,res)=>{

    res.send({
        code:500,
        msg:"无法连接数据库"
    })
})


module.exports = router