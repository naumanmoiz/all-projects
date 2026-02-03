var net = require('net');
var http = require('http');

var client = new net.Socket();
client.connect(6801, '131.156.156.33', function() {
	console.log('Connected');
	
		client.write('Hello, server!! Love, Client.');
	

	
});


client.on('data', function (data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
	

	http.createServer(function (req, res) {
	    res.writeHead(200, {'Content-Type': 'text/plain'});
	    res.end(data);
	}).listen(5010);
});




client.on('close', function() {
	console.log('Connection closed');
});