var fs = require('fs');
fs.open('./1.txt', 'r+', function (err, fd) {
    if (err) {
        console.log('文件打开失败');
    } else {
        var bf = new Buffer('hellow');
        //fs.write(fd, bf, 0, 5, 0, function (err, len, newbf) {
        //    console.info(len);
        //    console.info(newbf);
        //})
        fs.write(fd,'pdeng',5,'utf-8');
    }
})