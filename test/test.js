/**
 * Created by liuwei on 2018/1/30.
 */


async function testAsync(){
    return new Promise(function(reslove, reject) {
        await foo();
        reslove();
    })
}


function foo(){
    return new Promise(function(reslove, reject) {
        setTimeout(function(){
            console.log("---");
            reslove("hahha")
        },1000)
    })
}


await testAsync()
console.log("dsf");
