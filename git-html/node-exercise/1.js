/**
 * Created by pdeng on 16/3/13.
 */
var fs = require('fs');
console.info(process.env);
console.info('===========');
console.info(fs);
console.info('===========');
process.stdout.write('hello node');
process.stdout.write('请输入类容:');
process.stdin.resume();
process.stdin.on('data', function (chunk) {
    //默认输出的buffer类型数据,可以使用toString()方法转换成字符串
    //console.info(chunk.toString);
    console.info('您输入的内容是:' + chunk);//如果是字符串拼接默认是自带了toString方法了
})