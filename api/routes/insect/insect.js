/**
 * 爬虫项目
 * */
const express = require('express')
const router = express.Router()

router.use("/meitu",require('./meitu/index'))


module.exports = router