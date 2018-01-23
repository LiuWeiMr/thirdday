/**
 * Created by liuwei on 2018/1/21.
 */
const conditional = require('koa-conditional-get');    // 与koa-etag并用监测请求信息是否更新，更新则返回新内容，否则返回304，由客户端加载缓存页面
const etag = require('koa-etag');
const compose = require('koa-compose');    // 整合中间件
const serve = require('koa-static');    // 静态文件路径
const LRU = require('lru-cache');    // 热存储
const staticCache = require('koa-static-cache');    // 网络请求热存储
const compress = require('koa-compress');    // 压缩数据
const bodyParser = require('koa-bodyparser');    // 解析请求结构
const Koa = require("koa");
const Router = require('koa-router');
const user = require('./../@thirdday/user');
const Redis = require('./../@thirdday/db-redis');
const oAuth = require('./../@thirdday/oAuth');

const app = new Koa();
const router = new Router();
const config = require("./config.js");

// TODO：conditional, etag待测试
app.use(compose([conditional(), etag(),compress(config.compress), bodyParser(config.bodyParser)]));
oAuth.start(app,{});
user.start(router,{});



// 重定向，重定向后没有请求参数
router.get("/testServer", (ctx, next) => {
    console.log("----");
    ctx.redirect('/testServer_Copy');
    next();
})
router.get("/testServer_Copy", (ctx, next) => {
    console.log("=====",ctx.query);
    ctx.body = 'Hello World';
})
router.get("/haha", (ctx, next) => {
    console.log("=====",typeof ctx.params);
    ctx.body = 'Hello World';
})
router.post("/haha", (ctx, next) => {
    console.log("=====",typeof ctx.request.body,ctx.request.body);
    ctx.body = 'Hello World';
})

// 静态文件路径
//app.use(serve(__dirname + '/public'));
// 热存储
//var files = new LRU({ max: 1000 })
//app.use(staticCache({
//    dir: '/public',
//    dynamic: true,
//    files: files
//}))
app
    .use(router.routes())
    .use(router.allowedMethods());


// 监听错误信息
app.on('error', function(err, ctx){
    log.error('server error', err, ctx);
});

app.listen(4000);