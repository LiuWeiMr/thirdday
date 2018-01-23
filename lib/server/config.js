const zlib = require('zlib');    // 压缩数据

module.exports = {
  "compress": {    // 可以通过this.compress=false打开关闭压缩
    filter: function (content_type) {    // 是否可压缩
      return true;    // /text/i.test(content_type)
    },
    threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH
  },
  "bodyParser": {
    enableTypes: ['json', 'form', 'text'],     // 请求类型包含在['json', 'form']时解析
    //encode: "utf-8",     // 字符集
    //formLimit: "56kb",     // urlencoded极限值，超过报错401
    //jsonLimit: "1mb",     // json body极限值
    //textLimit: "1mb",     // text body极限值
    //strict: true,     // 只接受对象和数组类型
    //detectJSON: function (ctx) {     // 自定义JSON格式监测
    //  return /\.json$/i.test(ctx.path);
    //},
    extendTypes: {    // 支持扩展类型
      json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
    },
    onerror: function (err, ctx) {    // bodyParser解析错误自定义处理函数
      ctx.throw('body parse error', 422);
    }
    //ctx.disableBodyParser = true;    // 可以通过自定义该属性禁用bodyParser
    //ctx.request.rawBody;    // 可以通过该属性访问原生body
  }
}