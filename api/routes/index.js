const express = require('express')
const router = express.Router()
const fs = require("fs")

router.get("/test",(req,res)=>{
    fs.writeFile("./test.txt","Hello",{encoding:"utf8"},(err)=>{})
    res.send({
        code:0,
        msg:"成功"
    })
})

router.get("/read",(req,res)=>{
    let data = ""
    data = fs.readFileSync("./test.txt","utf8")
    res.send({
        code:0,
        msg:"成功",
        data
    })
})


module.exports = router