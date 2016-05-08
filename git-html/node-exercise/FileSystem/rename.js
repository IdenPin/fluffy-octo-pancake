var fs = require('fs');
fs.rename('./2.txt','./2.new.txt',function(err){
    if(err){
        console.info('更名失败');
    }else{
        console.info('更名成功');
    }
})