/**
 * 个人博客
 * */
const express = require('express');
const router = express.Router();

const cookieParser = require('cookie-parser');
const logger = require('morgan');

//数据库连接
const mongodb =require('../../db/blogDb/27017');

const session = require("express-session");
const connectMongo = require("connect-mongo")(session);//将session存储到服务器里

// 设置中间件
router.use(logger('dev'));
router.use(cookieParser());

//设置session后端cookie ,token
router.use(session({
    secret:"potatoChunks"//秘钥, 一个字符, 用于加密, 不用自己解密可以自己随便写
    ,cookie:{maxAge:2*60*60*1000}//给前端设置的cookie有效时间:2小时
    ,rolling:true //用户和页面交互的时候刷新cookie时间
    ,resave:false //是否每次重新存储session
    ,saveUninitialized:false //初始化
    ,store : new connectMongo({url : "mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/blog?retryWrites=true&w=majority"})//将session存储到数据库blog里
}));

//路由设置

router.use('/',require('./routers'));

module.exports = router;