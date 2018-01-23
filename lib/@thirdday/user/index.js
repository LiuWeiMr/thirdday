/**
 * Created by liuwei on 2018/1/22.
 */

function init(router, options) {

    router.get("/signIn", function (ctx, next) {
        if (ctx.state.userId) {
            G_REDIS_CLIENT.get()
        }
        else {
            ctx.body = {
                errorcde: "Not_Exist_Token"
            };

        }
    })
    router.post("/signUp", function (ctx, next) {
        }
    )
}

module.exports.start = init;