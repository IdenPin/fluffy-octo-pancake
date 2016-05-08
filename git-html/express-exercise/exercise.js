var http = require('http');
http.createServer(function (req, res) {
    res.writeHead('200', {'Content-Type': 'text/plain'});
    res.end('pdeng');
}).listen(6789, 'localhost');