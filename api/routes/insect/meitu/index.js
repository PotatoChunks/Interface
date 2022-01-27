/**
 * 美图
 * */

const express = require('express')
const router = express.Router()

// https://www.94imm.com
router.use("/91mm",require('./91MM'))


module.exports = router