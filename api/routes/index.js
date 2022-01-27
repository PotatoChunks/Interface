const express = require('express')
const router = express.Router()
const fs = require("fs")

router.use("/insect",require('./insect/insect'))

router.get("/read",(req,res)=>{
    res.send({
        code:0,
        msg:"成功",
        data:{user:"狗蛋"}
    })
})


module.exports = router