/**
 * Created by liuwei on 2018/1/22.
 */

const Redis = require("./redisClient.js");
const CRUD = require("./CRUD.js");

function init(router, options) {

    const client = new Redis().getClient();

    global.G_REDIS_CLIENT = client;
    global.G_REDIS_CLIENT['CRUD'] = CRUD;
    G_EVENTS.emit("Redis_Ready");


}

module.exports.start = init;
module.exports.Redis = Redis;
module.exports.CRUD = CRUD;