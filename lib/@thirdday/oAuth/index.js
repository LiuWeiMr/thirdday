/**
 * Created by liuwei on 2018/1/30.
 */

var oAuth = require("./oAuth.js");
var config = require("./config.js");

function init(app, options) {

    // Token检测错误
    app.use(function (ctx, next) {
        return next().catch(function (err) {
            console.log(err,"====");
            if (401 == err.status) {

                ctx.status = 401;
                //ctx.body = 'Protected resource, use Authorization header to get access\n';
                ctx.body = {errorcode: "Token_Not_Exist"};
            } else {
                throw err;
            }
        });
    });

    // 过滤白名单和检测Token
    app.use(oAuth().unless(config.unless))

}

module.exports.start = init;