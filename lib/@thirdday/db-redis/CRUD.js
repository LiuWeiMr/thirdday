/**
 * Created by liuwei on 2018/1/22.
 */

/**
 * Hash结构添加到Redis
 * @param hash
 * @param hash
 * @returns {Promise}
 */
function hmset(key, hash) {
    return new Promise(function(reslove, reject) {
        if (G_REDIS_CLIENT) {
            G_REDIS_CLIENT.hmset(key,hash,function(err, data) {
                if (err) {
                    console.error("Hmset_Error",err);
                    reject("Hmset_Error");
                } else {
                    reslove(data)
                }
            })
        } else {
            reject("Not_Exit_Redis_Client");
        }
    })

}

/**
 * 从Redis获取获取Hash结构数据
 * @param key
 * @returns {Promise}
 */
function hgetall(key) {
    return new Promise(function(reslove, reject) {
        if (G_REDIS_CLIENT) {
            G_REDIS_CLIENT.hgetall(key,function(err, data) {
                if (err) {
                    console.error("Hgetall_Error",err);
                    reject("Hgetall_Error");
                } else {
                    reslove(data)
                }
            })
        } else {
            reject("Not_Exit_Redis_Client");
        }
    })

}

/**
 * key-value格式添加到Redis
 * @param key
 * @param val
 * @returns {Promise}
 */
function set(key, val, expire) {
    return new Promise(function(reslove, reject) {
        if (G_REDIS_CLIENT) {
            var params = [key, val];

            // 设置过期时间,单位：秒
            if (expire) {
                params = params.concat(['EX', expire]);
            }
            G_REDIS_CLIENT.set(...params, function(err, data) {
                if (err) {
                    console.error("Set_String_Error",err);
                    reject("Set_String_Error");
                } else {
                    reslove(data)
                }
            })
        } else {
            reject("Not_Exit_Redis_Client");
        }
    })
}

/**
 * 从Redis获取key-value格式数据
 * @param key
 * @returns {Promise}
 */
function get(key) {
    return new Promise(function(reslove, reject) {
        if (G_REDIS_CLIENT) {
            G_REDIS_CLIENT.get(key, function(err, data) {
                if (err) {
                    console.error("Get_String_Error",err);
                    reject("Get_String_Error");
                } else {
                    reslove(data)
                }
            })
        } else {
            reject("Not_Exit_Redis_Client");
        }
    })
}

module.exports.hmset = hmset;
module.exports.hgetall = hgetall;
module.exports.set = set;
module.exports.get = get;