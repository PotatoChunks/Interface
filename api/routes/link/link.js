/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

const mongodb = require("./db");

// 
router.get("/",(req,res)=>{
    res.send({code:0})
})


module.exports = router