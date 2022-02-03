
var http = require('http');
const fs = require('fs');

const port = "3000";
const host = "localhost";

http.createServer(function(req,res) {
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.createReadStream('index.html').pipe(res)
}).listen(port, host);
console.log("Server on!");