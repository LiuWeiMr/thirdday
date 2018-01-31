/**
 * Created by liuwei on 2018/1/29.
 */

const uuidv5 = require('uuid/v5');
const config = require("./config.js");

/**
 * 登陆
 * @param userId
 * @param pass
 * @returns {Promise}
 */
function signIn(userId, pass) {
    return new Promise(function(reslove, reject) {

        if (userId == "18647723356" && pass == "123456") {
            var token = uuidv5(userId,config.MY_NAMESPACE);
            G_REDIS_CLIENT.CRUD.set(token,userId,config.tokenExpire).then(function(data) {
                reslove({"token":token})
            }).catch(function(err) {
                console.error("SignIn_Error: ", err);
                reslove({"errorcode":err})
            });
        } else {
            reslove({"errorcode":"User_Or_Pass_Error"})
        }
    })
}

/**
 * 登出
 * @param token
 * @returns {Promise}
 */
function signOut(token) {
    return new Promise(function(reslove, reject) {

        G_REDIS_CLIENT.CRUD.del(token).then(function(data) {
            reslove({"data":"OK"})
        }).catch(function(err) {
            console.error("SignOut_Error: ", err);
            reslove({"errorcode": "SignOut_Error"})
        });
    })
}

module.exports.signIn = signIn;
module.exports.signOut = signOut;