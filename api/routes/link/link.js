/**
 * 链接展示
 * */

const express = require('express')
const router = express.Router()

// link数据库
//const listDb = require('../../db/linkDb/db')

//
router.get("/",async (req,res)=>{
    let {title,href} = req.query
    let listList = require('../../db/linkDb/linkList')
    await listList.create({
        title:title,
        href:href,
        describe:"百度一下你就知道"
    }).then(_=>{
        console.log('链接添加成功')
    }).catch(_=>{
        console.log('链接添加失败')
    })
})

router.get('/get',async (req,res)=>{
    let listList = require('../../db/linkDb/linkList')
    await listList.find({}).then(data=>{
        res.send({
            data
        })
    })
})


module.exports = router