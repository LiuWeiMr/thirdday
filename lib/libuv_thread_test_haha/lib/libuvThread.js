/**
 * Created by liuwei on 2018/1/31.
 */


var libuvThreadCC = require('../build/Release/uv_thread.node').libuvThreadCC;

module.exports = function (work, arg, cb) {

    if ('function' !== typeof work) throw('argument[0] must be a function');
    if ('object' !== typeof arg) throw ('argument[1] must be a object');
    cb = cb || function() {};
    arg = JSON.stringify(arg);
    work = `(${work.toString()})(${arg})`;
    libuvThreadCC(work, cb);
}