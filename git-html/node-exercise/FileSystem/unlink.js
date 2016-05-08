var fs = require('fs');
fs.unlink('./2.txt',function(err){
    if(err){
        console.info('删除失败');
    }else{
        console.info('删除成功');
    }
})