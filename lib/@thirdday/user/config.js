module.exports = {
    "MY_NAMESPACE": "bbd3f999-2cb9-54b8-ad54-d1c948d202d9",
    "tokenExpire": 1800,
    "cookies": {
        "maxAge": 1800000,
        "path": "/",
        //"domain": "thirdday.com",    // 域
        //"secure": true,    // 是否仅通过HTTPS发送cookies，如果开启需在server模块中开启app.proxy=true;
        "httpOnly": true,    // 是否仅通过HTTP(S)发送cookies，并且客户端JavaScript不可操作
        "signed": true,    // 是否被加密
        "overwrite": true,    // 是否覆盖先前设置的cookies
    },
    "_comment": "tokenExpire单位是秒，cookies单位是毫秒"

}