/**
 * biqubot.net
 * */
const express = require('express')
const router = express.Router()

const request = require('../../../../../util/request')();

const {JSDOM} = require("jsdom");
const cheerio = require("cheerio");

const fs = require('fs');

const URL = 'https://www.biqudu.net';

// 搜索
router.post('/search',async (req,res)=>{
    let {name,page} = req.body;
    //数据
    let data = '';
    try {
        data = await request.get(`https://m.biqudu.net/SearchBook.php?keyword=${encodeURI(name)}&page=${page}`);
    } catch (error) {
        console.log(error);
        res.send({
            code:500,
            msg:"服务器错误"
        });
        return
    }
    // 数据转 DOM
    let {document} = new JSDOM(data).window;
    // 数据转 JQ
    let $ = cheerio.load(data);
    let $books = $('.bookbox')
    let booksArr = [];
    // 每一本数
    $books.each((index,item)=>{
        let booksObj = {}
        booksObj.id=index;
        booksArr.push(booksObj)
    });
    booksArr.forEach((item,index)=>{
        // 书名
        item.title = $($('.bookbox>.bookinfo>.bookname')[index]).text();
        // 作者
        item.author = $($('.bookbox>.bookinfo>.author')[index]).text();
        //简介
        item.describe = $($('.bookbox>.bookinfo>.intro_line')[index]).text();
        // 更新
        item.update = $($('.bookbox>.bookinfo>.update')[index]).text();
        // 最新章节
        item.newPage = URL + $($('.bookbox>.bookinfo>.update>a')[index]).attr('href');
        // 链接
        item.url = URL + $($('.bookbox>.bookimg>a')[index]).attr('href');
        // 图片
        item.img = $($('.bookbox>.bookimg>a>img')[index]).attr('src');
    });
    let sendObj = {
        code:0,
        msg:'成功',
        data:booksArr,
        next:false
    };
    // 是否有下一页
    if(!$('#nextPage').attr('href')){
        //
        sendObj.next = true;
    }
    res.send(sendObj);
});

//目录
router.get('/list',async (req,res)=>{
    //地址
    let {url} = req.query;
    res.send({
        url
    })
    return
    let data = '';
    try {
        data = await request.get(url);
    } catch (error) {
        console.log(error);
        res.send({
            code:500,
            msg:"服务器错误"
        });
        return
    }
    // 数据转 DOM
    let {document} = new JSDOM(data).window;
    // 数据转 JQ
    let $ = cheerio.load(data);
    // 章数组
    let pagesArr = [];

    $('#list>dl>dt:nth-of-type(2)~dd>a').each((index,item)=>{
        let pagesObj = {}
        pagesObj.title = $(item).text();
        pagesObj.href = URL + $(item).attr('href');
        pagesArr.push(pagesObj);
    });

    res.send({
        code:0,
        msg:"成功",
        data:pagesArr
    })
});

//内容
router.post('/content',async (req,res)=>{
    // 地址
    let {url} = req.body;
    let data = '';
    try {
        data = await request.get(url);
    } catch (err) {
        console.log(err);
        res.send({
            code:500,
            msg:"服务器错误"
        });
        return
    }
    // 数据转 DOM
    let {document} = new JSDOM(data).window;
    // 数据转 JQ
    let $ = cheerio.load(data);

    let contentHtml = $('#content').html();

    res.send({
        code:0,
        msg:"成功",
        data:contentHtml,
        pre:URL + $('.bottem2>.pre').attr('href'),// 上一章
        next:URL + $('.bottem2>.next').attr('href')// 下一章
    })
});


module.exports = router