const express = require('express')
const router = express.Router()

router.get("/test",(req,res)=>{
    res.sendFile("aaa.js")
})


module.exports = router