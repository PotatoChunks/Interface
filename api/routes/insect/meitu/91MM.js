// https://www.94imm.com
const express = require('express');
const router = express.Router();

// 字符转 dom 和 JQ
const {JSDOM} = require("jsdom");
const cheerio = require("cheerio");
// https 请求
const request = require('../../../../util/request')();

// 请求路径
const url = "https://www.94imm.com";

// 图片数组
const images = [];

// 路径裁切 url(/aaa/bbb/ddd.jpg) 这种路径
function getUrl(str) {
    return url + str.substr(4, str.length - 5);
}

// 打乱数组
function shuffle(arr) {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}

// 主页的封面
async function getRequ(reqUrl, pages=1) {
    // 1 2 3 4 6 分区
    let arr = [1, 2, 3, 4, 6];
    let tot = arr[((Math.random() * arr.length) | 0)];
    // Math.random()*5+1|0 : 1~5
    reqUrl += '/type/' + tot + '/?page=' + ((Math.random() * 3 + 1) | 0);
    // console.log(reqUrl);
    // 请求
    let data = await request.get(reqUrl);
    // 数据转 DOM
    let {document} = new JSDOM(data).window;
    // 数据转 JQ
    let $ = cheerio.load(data);
    // console.log(data)
    // 写入文件
    //fs.writeFile("./a.html",data,{encoding:"utf8"},(err,w)=>{})
    // 封面信息
    let imgData = $('.imgbox');
    // //获取封面图片

    let imgs = [];

    imgData.each(function (index, item) {
        imgs.push(getUrl($(item).css('background-image')))
    });
    // 获取每个封面链接
    let titleHref = $('.thumbnail h2>a');
    // 标题连接
    let hrefArr = [];
    titleHref.each(function (index, item) {
        hrefArr.push(url + $(item).attr('href'))
    });
    // 请求内容
    // 数组里的元素
    // 返回一个图片数组
    imgs.push(...(await getImgReq(hrefArr, pages)));
    // 打乱数组
    shuffle(imgs);
    // 裁切所要的
    // 返回
    images.push(...imgs.slice(0, pages))
}

// 请求每个封面的内容
async function getImgReq(reqUrlArr, pages) {
    // 打乱数组
    shuffle(reqUrlArr);
    //随机数组下标 0~数组最大长度
    let tot = ((Math.random() * (reqUrlArr.length - 1) + 1) | 0);

    // 请求数组里的某一个元素
    let reqUrl = reqUrlArr[tot];
    // 将当前元素从数组里删除
    reqUrlArr.splice(tot, 1);
    // 请求地址
    let data = await request.get(reqUrl);

    // 数据转 DOM
    let {document} = new JSDOM(data).window;
    // 数据转 JQ
    let $ = cheerio.load(data);
    // 写入文件
    //fs.writeFile("./a.html",data,{encoding:"utf8"},(err,w)=>{})
    // 获取图片
    let imgData = $('#img-box>p>img');
    // 图片数组
    let imageArr = [];
    imgData.each(function (index, item) {
        imageArr.push(url + $(item).attr('data-src'));
    });
    // 打乱数组
    shuffle(imageArr);
    // 如果请求的张数 比获取到的图片数组大 进行继续请求
    // 最多请求30张 避免回调地狱
    pages = pages >= 30 ? 30 : pages;

    let num = pages - imageArr.length;
    if (num > 0) {
        //图片不够 继续请求
        let secondImgArr = await getImgReq(reqUrlArr, num);
        imageArr.push(...secondImgArr);
    }
    // 返回特定长度的图片数组
    return imageArr.slice(0, pages);
}


router.get('/', async (req, res) => {
    let {num} = req.query;
    // 请求 连接 和 张数
    // 最多一次请求30张
    try{
        await getRequ(url, num);
    }catch (e) {
        console.log(e);
        // 出错
        images.length = 0;
        images.push('https://api.lolicon.app/assets/img/lx.jpg')
    }
    res.send(images)
});


module.exports = router;