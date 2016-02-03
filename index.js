var http = require('http');
var data = require('./data.json');

var URI = process.env.MONGOLAB_URI;

console.log(URI);

http.createServer(function(req, resp) {
  resp.setHeader('Content-Type', 'text/html');
  resp.write(URI || 'bla');
  resp.end('hello');
}).listen(process.env.PORT || 8000);
