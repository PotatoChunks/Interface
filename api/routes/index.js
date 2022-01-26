const express = require('express')
const router = express.Router()
const fs = require("fs")

router.get("/test",(req,res)=>{
    let user = {name:"狗蛋",age:18,status:true}
    fs.writeFileSync("./aa.txt",JSON.stringify(user),{encoding:"utf8"})
    res.send({
        code:0,
        msg:"成功"
    })
})

router.get("/read",(req,res)=>{
    let data = ""
    data = fs.readFileSync("./aa.txt","utf8")
    res.send({
        code:0,
        msg:"成功",
        data:JSON.parse(data)
    })
})


module.exports = router