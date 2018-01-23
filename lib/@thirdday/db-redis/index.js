/**
 * Created by liuwei on 2018/1/22.
 */

const Redis = require("./redisClient.js");
const CRUD = require("./CRUD.js");

function init(router, options) {

    const client = new Redis().getClient();
    client.get("foo",function(err,data) {
        console.log(err,data);
    })

    global.G_REDIS_CLIENT = client;


}

module.exports.start = init;
module.exports.Redis = Redis;
module.exports.CRUD = CRUD;