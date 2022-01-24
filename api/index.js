const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()

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

//设置路由
app.use('/', require('./routes/index'))

module.exports = app