/**
 * Created by liuwei on 2018/1/22.
 */

function pub(){
    return new Promise(function(reslove, reject) {
        if (G_REDIS_PUB_CLIENT) {
            G_REDIS_PUB_CLIENT.hgetall(hash,function(err, data) {
                if (err) {
                    console.error("Hgetall_Error",data);
                    reject("Hgetall_Error");
                } else {
                    reslove{data}
                }
            })
        } else {
            reject("Not_Exit_Redis_Client");
        }
    })

}

function sub(subSignal) {
    return new Promise(function(reslove, reject) {
        if (G_REDIS_SUB_CLIENT) {

            // 订阅
            G_REDIS_SUB_CLIENT.subscribe(subSignal);
            G_REDIS_SUB_CLIENT.on("subscribe", function (channel, count) {
                pub.publish("a nice channel", "I am sending a message.");
                pub.publish("a nice channel", "I am sending a second message.");
                pub.publish("a nice channel", "I am sending my last message.");
            });

            // 监听消息
            sub.on("message", function (channel, message) {
                console.log("sub channel " + channel + ": " + message);
                msg_count += 1;
                if (msg_count === 3) {
                    sub.unsubscribe();
                    sub.quit();
                    pub.quit();
                }
            });
        } else {
            reject("Not_Exist_Redis_Client");
        }
    })
}