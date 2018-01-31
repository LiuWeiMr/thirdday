var whitePath = require("./whitePath.js");
module.exports = {
    "unless": {
        //"method": "OPTIONS",
        "path": whitePath,
        "ext": ['.css'],
        "custom": function () {    // 函数检测
            return false;
        },
        "useOriginalUrl": true,    // 使用this.originalUrl属性比较，如果为false则用this.url比较
        "_comment": "1、method表示忽略的请求方法，可以是string或者数组。2、ext表示扩展名"
    },
    "tokenExpire": 1800    // Token过期时间
}