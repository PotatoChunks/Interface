const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
//添加session中间件
const session = require("express-session");


// CORS & Preflight request
app.use((req, res, next) => {
    if (req.path !== '/' && !req.path.includes('.')) {
        res.set({
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': req.headers.origin || '*',
            'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
            'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
            'Content-Type': 'application/json; charset=utf-8',
        })
    }
    req.method === 'OPTIONS' ? res.status(204).end() : next()
})

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, '../public')))

app.use(session({
    secret:"potato"//秘钥, 一个字符, 用于加密, 不用自己解密可以自己随便写
    ,cookie:{maxAge:10*60*1000}//给前端设置的cookie有效时间:10分钟
    ,rolling:true //用户和页面交互的时候刷新cookie时间
    ,resave:false //是否每次重新存储session
    ,saveUninitialized:false //初始化
//不需要的可以不用写
}))

//设置路由
app.use('/', require('./routes/index'))

const port = process.env.PORT || 3000
const host = process.env.HOST || ''

app.server = app.listen(port, host, () => {
    console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})

module.exports = app