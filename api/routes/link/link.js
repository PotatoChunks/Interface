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
        res.send({
            code:0,
            msg:"成功"
        })
    }).catch(_=>{
        res.send({
            code:500,
            msg:"失败"
        })
    })
})

router.get('/get',async (req,res)=>{
    let listList = require('../../db/linkDb/linkList')
    await listList.find({}).then(data=>{
        res.send({
            data
        })
    }).catch(_=>{
        res.send({
            code:500,
            msg:"失败"
        })
    })
})


module.exports = router