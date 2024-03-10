/**
 * cg.163
 * */
const express = require('express')
const router = express.Router()
const got = require('got')

const codeUrl = [
    {
        url:'https://n.cg.163.com/api/v1/phone-captchas/86-',
        time:20
    }
]

function foo(phone){
    codeUrl.forEach(async item=>{
        let data = await request.post(item.url+phone);
        //console.log(item);
    })
}

router.get('/',(req,res)=>{
    let {phone} = req.query;
    foo(phone);
    res.send({
        code:0,
        msg:'成功'
    })
})

module.exports = router