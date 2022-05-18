/**
 * 短信验证码
 */
const express = require('express')
const router = express.Router()

router.use('/wy163',require('./wy163/wy163'))

module.exports = router