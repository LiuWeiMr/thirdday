/**
 * Created by liuwei on 2018/1/22.
 */
const user = require("./user.js");
const config = require("./config.js");

function init(router, options) {

    router.put("/signIn", signIn);
    router.put("/signOut", signOut);
    router.post("/signUp", function (ctx, next) {
        ctx.body = {
            errorcde: "signUp"
        };
    })
}

// 登陆
var signIn = async function (ctx, next) {
    if (ctx.request.body.userId && ctx.request.body.pass) {
        var signInData;    // 登陆返回数据
        try {

            // 登陆
            signInData = await user.signIn(ctx.request.body.userId, ctx.request.body.pass);
            ctx.cookies.set("token", signInData.token, config.cookies);    // cookie中设置token
        } catch (err) {
            console.error("SignIn_Error：", err);
            ctx.status = err.status || 500;
            signInData = {"errorcode": "SignIn_Error"}
        } finally {
            ctx.body = signInData;
        }
    } else {
        ctx.body = {
            errorcde: "Incomplete_Parameters"
        };
    }
}
// 登出
var signOut = async function (ctx, next) {
    var token = ctx.cookies.get("token", {signed: true});
    if (token) {
        var signOutData;    // 登陆返回数据
        try {

            // 登陆
            signOutData = await user.signOut(token);
            ctx.cookies.set("token", undefined, {signed: true});    // cookie中清空token
        } catch (err) {
            console.error("SignOut_Error：", err);
            ctx.status = err.status || 500;
            signOutData = {"errorcode": "SignOut_Error"}
        } finally {
            ctx.body = signOutData;
        }
    } else {
        ctx.body = {
            errorcde: "Incomplete_Parameters"
        };
    }
}

module.exports.start = init;