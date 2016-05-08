var fs = require('fs');
fs.open('./1.txt', 'r', function (err, fd) {
    if (err) {
        console.log('文件打开失败');
    } else {
        console.log('读取中..');
        var bf = new Buffer(10);
        /*
         * fs.read(fd,buffer,offset,length,position,[callback(err,bytesRead,buffer)])
         * buffer      缓冲区，数据将被写入。
         * offset      buffer写入的偏移量
         * length     （integer）   指定文件读取字节数长度
         * position   （integer）   指定文件读取的起始位置，如果该项为null，将从当前文件指针的位置开始读取数据。
         * callback      回调传递了三个参数，err， bytesRead， buffer
         * err  异常
         * bytesRead:读取的字节数
         * buffer:缓冲区对象
         * */
        fs.read(fd, bf, 0, 4, 0, function (err, len, newbf) {
            console.info(bf.toString());
            console.info(len);
            console.info(newbf);
        })
    }
})