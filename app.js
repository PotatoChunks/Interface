let http = require('http')
let server = http.createServer((req,res)=>{
    res.writeHead(200,{'Contetn-type':'text/html;charset=UTF-8'})
    res.write('<h1>Hellow</h1>')//写入
    res.end('hellow')//结束
})
server.listen(80)//监听端口