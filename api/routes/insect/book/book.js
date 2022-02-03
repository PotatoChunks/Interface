/**
 * 小说
 * */

const express = require('express')
const router = express.Router()

//
router.get("/book",(req,res)=>{
    res.send('哦豁')
})


module.exports = router