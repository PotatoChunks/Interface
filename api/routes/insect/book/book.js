/**
 * 小说
 * */

const express = require('express')
const router = express.Router()

// 笔趣阁
router.use('/biqu',require('./biqudu/biqudu'))


module.exports = router