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
    await listList.create({
        title:"百度",
        href:"https://www.baidu.com",
        describe:"百度一下你就知道"
    }).then(_=>{
        console.log('链接添加成功')
    }).catch(_=>{
        console.log('链接添加失败')
    })
    let {user,pwd} = req.query;
    res.send({
        user,
        pwd
    })
})


module.exports = router