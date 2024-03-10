/**
 * 接口项目
 * */
const express = require('express')
const router = express.Router()

router.use('/code',require('./code/code'))


module.exports = router