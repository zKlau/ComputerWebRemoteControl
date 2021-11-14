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
  //
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

    const tex = fs.readFileSync("data.txt",'utf8');
    const lines = tex.split(/\r?\n/);
    for(let i = 0 ; i < lines.length ; i++) {
      let apps = lines[i].split("@")
      response.write('<form method="post" action=website> <input class="hidden" type="text" name="name" value=' + lines[i] + ' /> <input type="submit" value=' + apps[0] + ' /> </form>');
    }
    //LoadApps(response);
    fs.createReadStream('index.html').pipe(response);
  }
});

function openProgram(name)
{

  let app = name.replace("name=", "").split("%40");
  
  let path = app[1].replace(/%3A/g,":").replace(/%5C/g,'\\');
  console.log(path);

  SaveApps(app[0],path);
  chld.exec(path);

}
const port = 3000
const host = 'localhost'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`);

function SaveApps(name,path)
{
  var stream = fs.createWriteStream("data.txt", {'flags': 'a'});
  stream.once('open', function(fd) {
    stream.write("\r\n" + name + "@" + path);
  });
}

function LoadApps(res)
{
  

  fs.readFileSync("data.txt",'utf8', function(err,data) {
    if(err) {
      console.log(err);
    } else {
      let apps = data.split("@")
      res.write('<form method="post" action=website> <input class="hidden" type="text" name="name" value=' + apps[1] + '/> <input type="submit" value=' + apps[0] + ' /> </form>');
    }
  });
}
// shell.exec(".\\hostServer.bat");


// lt --port 3000