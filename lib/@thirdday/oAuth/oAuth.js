/**
 * Created by liuwei on 2018/1/30.
 */

const unless = require("koa-unless");
const config = require("./config.js");

module.exports = function () {

    /**
     * 检测Token
     */
    var oAuth = async function (ctx, next) {
        var token = ctx.cookies.get("token", {signed: true});
        var userId;
        var expireStatus;

        // 不存在token
        if (!token) {
            ctx.status = 401;
            ctx.body = {errorcode: "Token_Not_Exist"};
            return;
        }

        try {

            // 查看token是否有效
            userId = await G_REDIS_CLIENT.CRUD.get(token);
            // 更新服务端Token过期时间：单位：秒
            expireStatus = await G_REDIS_CLIENT.CRUD.expire(token, config.tokenExpire);
        } catch (err) {
            console.error("OAuth_Error：", err);
        } finally {

            // Token存在
            if (userId) {
                ctx.state.userId = userId;

                // 更新Token过期时间成功
                if (expireStatus) {
                    return next();
                } else {
                    ctx.status = 500;    // 500表示未曾预料的错误
                    ctx.body = {errorcode: "Token_Expire_Error"};
                    return;
                }
            } else {
                ctx.status = 401;
                ctx.cookies.set("token", undefined, {signed: true});    // cookie中设置token
                ctx.body = {errorcode: "Token_Not_Exist"};
                return;
            }
        }
    }

    oAuth.unless = unless;
    return oAuth;

}