var fs = require('fs');
var fileName = '2.txt';
//fs.writeFile(fileName,'pdeng',function(){
//    console.log(arguments);
//})

fs.appendFile(fileName,'hello',function(){
    console.info(arguments);
})

//判断一个文件是否存在
fs.exists(fileName,function(err){
    console.info(err);
})