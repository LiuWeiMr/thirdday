/**
 * Created by liuwei on 2018/1/22.
 */

var redis = require("./../index.js");


redis.start()

redis.CRUD.set(...["foo", "bar", 10])
    .then(function(data) {
        if (data) {
            data = data.toString();
        }
        console.log("set: ",data);
    })
    .catch(function(err) {
        if (err) {
            err = err.toString();
        }
        console.log("set err: ",err);
    })


setTimeout(function(){
    console.log("查询");
    redis.CRUD.get("foo")
    .then(function(data) {
        if (data) {
            data = data.toString();
        }
        console.log("get: ",data);
    })
    .catch(function(err) {
        if (err) {
            err = err.toString();
        }
        console.log("get err: ",err);
    })
},15000)