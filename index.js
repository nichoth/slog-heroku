var http = require('http');

http.createServer(function(req, resp) {
  resp.setHeader('Content-Type', 'text/html');
  resp.end('hello');
}).listen(process.env.PORT || 8000);
