/**
 * 个人博客
 * */
const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');
const logger = require('morgan');

//数据库连接
//const mongodb =require('../../db/blogDb/27017');

const session = require("express-session");
const connectMongo = require("connect-mongo")(session);//将session存储到服务器里

// 设置中间件
router.use(logger('dev'));
router.use(cookieParser());

//设置session后端cookie ,token


//路由设置

router.use('/',require('./routers'));

module.exports = router;