var net = require('net');

var server = net.createServer(function(socket) {
	socket.on('data', function(data){
		var response = data.toString().trim();
		console.log(response + '\r\n');
	});
});

server.listen(1337, '127.0.0.1');

var client = new net.Socket();
client.connect(1338, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
	console.log('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});