/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

// link数据库
//const listDb = require('../../db/linkDb/db')

//
router.get("/",async (req,res)=>{
    let listList = require('../../db/linkDb/linkList')
    let {user,pwd} = req.query;
    res.send({
        user,
        pwd
    })
})


module.exports = router