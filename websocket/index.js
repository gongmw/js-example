const http = require('http');
const fs = require('fs')
const path = require('path')
const WebSocketServer = require('ws').Server;
const ws = new WebSocketServer({port: 8081});

ws.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received:', message);
  });
  ws.send('hello world');
});

http.createServer(function (req, res) {
  res.end(fs.readFileSync(path.resolve(__dirname + '/index.html')));
}).listen(8080);
