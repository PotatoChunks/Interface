const express = require('express')
const router = express.Router()
const fs = require("fs")

// 爬虫
router.use("/insect",require('./insect/insect'));

// 游戏
router.use('/game',require('./game/index'));


// 个人博客
//router.use('/blog',require('./blog/blog'));

// ico图标
router.get("/favicon.ico",(req,res)=>{
    // ico 图标
    res.send()
});

// 404
router.get('*',(req,res)=>{
    res.redirect("/404.html")
})


module.exports = router;