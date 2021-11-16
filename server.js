const http = require('http')
var child = require('child_process').execFile;
const chld = require('child_process');
const shell = require('shelljs');
const fs = require('fs');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let del = false;
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
      openProgram(body);
    })
  } else {
    
    console.log('GET')
    response.writeHead(200, {'Content-Type': 'text/html'})
    const appText = fs.readFileSync("data.txt",'utf8');
    const appSplit = appText.split(/\r?\n/);

    const lines = appSplit.filter((value, index) => {
      return appSplit.indexOf(value) === index;
    });
    response.write('<input id="add_name" style="display: inline-block;" type="text" placeholder="Name"> <input id="add_path" style="display: inline-block;" type="text" placeholder="C:\\path\\something.exe"><br>  <form method="post" > <input class="hidden" type="text" name="name" value="Add" /><input type="submit" value="Add" onclick="deleteTimer()"/> </form>  <br> <form method="post" action=website> <input class="hidden" type="text" name="name" value="Delete"/><input type="submit" value="Delete" onclick="deleteTimer()"/> </form> <br>')
    for(let i = 0 ; i < lines.length ; i++) {
      if(lines[i] != "") {
        let apps = lines[i].split("@")
        response.write('<form method="post" > <input class="hidden" type="text" name="name" value=' + lines[i] + ' /><input type="submit" value=' + apps[0] + ' /> </form>');
      }
      
    }
    fs.createReadStream('index.html').pipe(response);
  }
});

function openProgram(name)
{
  let og = name;
  if(name.includes("name=Add%40"))
  {
    name = name.replace("name=Add%40","");
    let app = name.replace("name=", "").split("%40");
    let path = app[1].replace(/%3A/g,":").replace(/%5C/g,'\\');
    SaveApps(app[0],path);
    
  }
  console.log(name);
  if(name == "name=Delete") 
  {
    del = true;
  }

  if (name != "name=Delete" && del == false && !og.includes("Add")) 
  {
    let app = name.replace("name=", "").split("%40");
    let path = app[1].replace(/%3A/g,":").replace(/%5C/g,'\\');
    //SaveApps(app[0],path);
    chld.exec(path);
  }

  if(del == true && name != "name=Delete") 
  {
    let app = name.replace("name=", "").split("%40");
    let path = app[1].replace(/%3A/g,":").replace(/%5C/g,'\\');

    const appText = fs.readFileSync("data.txt",'utf8');
    const appSplit = appText.split(/\r?\n/);
    let removeApp = [];
    appSplit.forEach(ele => {
      if(ele == app[0] + "@" + path)
      {
        removeApp = appSplit.filter((e) => {
          return e != app[0] + "@" + path;
        });
        }
    });
    console.log(removeApp);
    fs.writeFile('data.txt','', function() {
      console.log('done');
    });
    var stream = fs.createWriteStream("data.txt", {'flags': 'a'});
    stream.once('open', function(fd) {
      removeApp.forEach(ele => {
        stream.write("\r\n" + ele);
      });
    });
    del = false;

  }

  

  

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