/**
 * 爬虫项目
 * */
const express = require('express')
const router = express.Router()

// 图
router.use("/meitu",require('./meitu/index'))

// 小说
router.use("/book",require('./book/book'))


module.exports = router