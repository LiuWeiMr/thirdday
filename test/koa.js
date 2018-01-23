/**
 * Created by liuwei on 2018/1/21.
 */

function *gen1(next) {
    console.log("1111");
    yield "gen1";
    yield *next;
    yield "gen1 end";
    console.log("1111end");
}
function *gen2(next) {
    console.log("2222");
    yield "gen2";
    yield *next;
    yield "gen2 end";
    console.log("2222end");
}
function *gen3(next) {
    console.log("3333");
    yield "gen3";
    yield *next;
    yield "gen3 end";
    console.log("3333end");
}

function *noop(){

}
var middle = [gen1, gen2, gen3];
var next = noop();
var i = middle.length;

while (i--) {
    next = middle[i].call(null, next);
}

for (var v of next) {
    console.log(v)
}