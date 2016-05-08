var fs = require('fs');
fs.stat('./2.new.txt',function(){
    console.info(arguments)
})