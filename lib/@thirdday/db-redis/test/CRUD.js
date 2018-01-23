/**
 * Created by liuwei on 2018/1/23.
 */

var key = "key1";
var val = "val";
var expire = 60 * 60;
var params = [key, val];

// 设置过期时间,单位：秒
if (expire) {
    params = params.concat(['EX', expire]);
    console.log("---");
}
console.log(...params);