/**
 * Created by liuwei on 2018/1/22.
 */
const redis = require("redis");
const config = require("./config.json");

var redisOptions = {
    host: config.redisHost,
    port: config.redisPort,
    return_buffers: true,
    socket_keepalive: true,    // 长连接
    no_ready_check: false,    // 服务器是否准备就绪
    enable_offline_queue: true,    // 未连接服务器时，命令添加到队列中，连接后执行
    retry_unfulfilled_commands: true,    // 重连后执行中断连接未执行的命令
    //password: config.redisPass,    // 连接密码
    //db: null,    // 设置后使用Redis的select命令查询
    family: "IPv4",    // 设置IPv6将强制使用IPv6连接
    disable_resubscribing: false,    // 断开连接后是否重连
    rename_commands: {},    // 重命名命令
    tls: null,    // 设置使用ssl连接方式
    retry_strategy: function (options) {    // 设置重连机制
        if (options.error && options.error.code === 'ECONNREFUSED') {    // 服务拒绝连接抛出错误
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > config.redisTotalRetryTime) {    // 重连时间超过设置时间
            return new Error('Retry time exhausted');
        }
        if (options.attempt > config.redisTttempt) {     // 重连次数超过设置次数
            return new Error('Retry count exhausted');
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
}

class Redis {
    constructor(option){
        redisOptions = option || redisOptions;
        this.client = redis.createClient(redisOptions);
        this.client.auth(config.redisPass,function (err, data) {
            console.log("redis增删改查保存密码：",err,data);
        })
        // 监听redis连接错误
        this.client.on("error", function(err) {
            console.error("redis增删改查客户端错误：",err);
        })
    }

    getClient(){
        return this.client;
    }
}



module.exports = Redis;