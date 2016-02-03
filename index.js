var http = require('http');
var data = require('./data.json');

var URI = process.env.MONGOLAB_URI;

http.createServer(function(req, resp) {
  resp.setHeader('Content-Type', 'text/html');
  resp.write('<pre>');
  resp.write(URI || 'bla');
  resp.write('\nhello');
  resp.end('</pre>');
}).listen(process.env.PORT || 8000);
