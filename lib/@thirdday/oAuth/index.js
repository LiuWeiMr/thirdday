/**
 * Created by liuwei on 2018/1/22.
 */

const jwt = require('koa-jwt');    // Token验证

function init(app, options) {

    app.use(function(ctx, next){
        ctx['opts'] = {
            cookie: "jwtdata"
        }
        console.log(ctx.state.user);
        return next().catch((err) => {
                if (401 == err.status) {
            console.log(ctx.state.user);

            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
    });


    app.use(jwt({
        secret: 'shared-secret',
        passthrough: true,    // 是否不验证直接通过
        //key: 'jwtdata'    // 通过其他的key验证
    }).unless({ path: [/^\/public/] }));
}

module.exports.start = init;