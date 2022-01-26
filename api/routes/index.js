const express = require('express')
const router = express.Router()
const fs = require("fs")

router.get("/test",(req,res)=>{
    res.send({
        code:0,
        msg:"成功"
    })
})

router.get("/read",(req,res)=>{
    res.send({
        code:0,
        msg:"成功",
        data:JSON.parse(data)
    })
})


module.exports = router