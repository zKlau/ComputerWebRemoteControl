const http = require('http')
var child = require('child_process').execFile;
const chld = require('child_process');
const shell = require('shelljs');
const fs = require('fs');

const server = http.createServer(function(request, response) {
  console.dir(request.param)

  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
      //console.log(data)
    })
    request.on('end', function() {
      console.log(body);
      openProgram(body);
    })
  } else {
    console.log('GET')
    response.writeHead(200, {'Content-Type': 'text/html'})
    fs.createReadStream('index.html').pipe(response);
  }
})

function openProgram(name)
{
  console.log(name.replace("name=","").replace(/%3A%5C%5C/g,":\\" + "\\").replace(/%5C%5C/g,'\\' + "\\"));
  chld.exec(name.replace("name=","").replace(/%3A%5C%5C/g,":\\" + "\\").replace(/%5C%5C/g,'\\' + "\\"));
}
const port = 3000
const host = 'localhost'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`);

// shell.exec(".\\hostServer.bat");


// lt --port 3000