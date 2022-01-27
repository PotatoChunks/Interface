// https://www.94imm.com
const express = require('express')
const router = express.Router()

const cheerio = require('cheerio')

router.get('/',(req,res)=>{
    res.send({code:1,msg:"哦豁哦豁哦豁"})
})



module.exports = router