const http = require('http')
var child = require('child_process').execFile;
const chld = require('child_process');
const shell = require('shelljs');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const server = http.createServer(function(request, response) {
  console.dir(request.param)

  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
    })
    request.on('end', function() {
      console.log();
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
  let app = name.replace("name=", "").split("%40");
  console.log(app[1]);
  let path = app[1].replace(/%3A%5C%5C/g,":\\" + "\\").replace(/%5C%5C/g,'\\' + "\\");

  SaveApps(app[0],path);
  chld.exec(path);
  
  
}
const port = 3000
const host = 'localhost'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`);

function SaveApps(name,path)
{
  fs.appendFile("data.txt",name + "@" + path, (err) => {
    if(err) 
      console.log(err);
  });
}

function LoadApps()
{
  fs.readFile("data.txt",'utf8', function(data,err) {
    if(err) {
      console.log(err);
    }
  });
}
// shell.exec(".\\hostServer.bat");


// lt --port 3000