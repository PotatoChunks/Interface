const express = require('express')
const router = express.Router()
const fs = require("fs")
const path = require('path')

// 爬虫
router.use("/insect",require('./insect/insect'));

// 游戏
router.use('/game',require('./game/index'));


// ico图标
router.get("/favicon.ico",(req,res)=>{
    // ico 图标
    res.send()
});


// 404
router.get('*',(req,res)=>{
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.join(__dirname,'../../public/404.html'))
})


module.exports = router;