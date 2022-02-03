
var http = require('http');
const fs = require('fs');

const port = "3000";
const host = "localhost";

http.createServer(function(req,res) {
    res.writeHead(200,{'Content-Type': 'text/html'});
    //res.write('<button href="app.runAse()">click</button>');
    //res.end('<input id = "Double Click here" type = "button" value = "clickme" onclick = "console.log("working");" />');
    fs.createReadStream('index.html').pipe(res)
}).listen(port, host);
console.log("Server on!");



// lt --port 3000