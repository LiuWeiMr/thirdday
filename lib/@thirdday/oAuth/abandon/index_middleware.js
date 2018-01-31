/**
 * Created by liuwei on 2018/1/22.
 */

module.exports = function () {
    var oAuth = function *(next) {
        console.log(oAuth.unless);

    };

    oAuth.unless = require("koa-unless");
    return oAuth;
}