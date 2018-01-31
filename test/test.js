/**
 * Created by liuwei on 2018/1/30.
 */


const config = require("./config.json")

//console.log(config);

var n = 8.15;
var c=0;
while (n > 1) {
    n = n - n * 0.1;
    console.log(n);
    c++;
}

console.log(c);