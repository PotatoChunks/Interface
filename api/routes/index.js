const express = require('express')
const router = express.Router()
const fs = require("fs")
const path = require('path')

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

router.get('/',(req,res)=>{
    res.send({
        code:0,
        msg:'成功',
        data:[
            {
                href:'https://api-potatochunks.vercel.app/book/book.html',
                title:'小说'
            }
        ]
    })
})

// 404
router.get('*',(req,res)=>{
    res.header('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.join(__dirname,'../../public/404.html'))
})


module.exports = router;