const express = require('express')
const router = express.Router()

router.post("/test",(req,res)=>{
    res.sendFile("aaa.js")
})


module.exports = router