/**
 * @Description: 
 * @Author: gcz
 * @Date: 2023-02-23 09:56:42
 * @LastEditors: gcz
 * @LastEditTime: 2023-03-13 14:41:51
 * @FilePath: \aichat\index.js
 * @Copyright: Copyright (c) 2016~2023 by gcz, All Rights Reserved. 
 */
const express = require('express');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
const cors = require('cors');

const fs = require("fs");

const app = express();

// 设置允许跨域的域名，*代表允许任意域名跨域 
const allowedOrigins = ['http://ai.momen.vip', 'https://ai.momen.vip',process.env.ORIGIN];

// 使用 cors 中间件 
// app.use(cors({ origin: function(origin, callback){
// // 检查请求是否在允许的域名列表中 
// if(allowedOrigins.indexOf(origin) === -1){
// const msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.'; 
// return callback(new Error(msg), false); 
// } 
// return callback(null, true); }
// }));

const corsOptions = {
    origin:allowedOrigins
};
app.use(cors(corsOptions));

//  app.use(cors({ origin: 'http://43.155.171.97' }));

app.use(express.json());
app.use(express.urlencoded({extended:false}));


//app.use('/', require('./routes/index'));
const path = require('path')
app.use(express.static(path.join(__dirname, 'front')))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/"+"index.html");
});

app.use('/openai',require('./routes/openaiRoutes'));
app.use('/api/openai',require('./routes/openaiRoutes'));

// catch 404 and forward to error handler
let createError = require('http-errors');
app.use(function (req, res, next) {
    // console.log('reqreq',req)
  next(createError(404));
});


// 使用fs.readFile打开html文件
app.get("/index.html", (request, response) => {
    fs.readFile("./" + request.path.substr(1), (err, data) => {
        // body
        if (err) {
            console.log(err);
            //404：NOT FOUND
            response.writeHead(404, { "Content-Type": "index/html" });
        }
        else {
            //200：OK
            response.writeHead(200, { "Content-Type": "index/html" });
            response.write(data.toString());
        }
        response.end();
    });
});


/* 代理配置 start */
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const proxyOptions = {
//     target: 'http://127.0.0.1:5000', //后端服务器地址
//     changeOrigin: true //处理跨域
// };
// const exampleProxy = createProxyMiddleware(proxyOptions); //api前缀的请求都走代理
// app.use('/api',exampleProxy);
/* 代理配置 end */

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})
module.exports = app;

// var server = app.listen(port, function () {

//   var host = server.address().address
//   var port = server.address().port

//   console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })


