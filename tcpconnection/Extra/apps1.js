var net = require('net');
var client = new net.Socket();
var HOST = '127.0.0.1'; var PORT = '1337';
client.connect(PORT, HOST, function() {
	console.log('Connected' + HOST + PORT);
	client.write('Hello, server! Love, Client.');
	//client.push('Hello,world');
	//client.write('Hi');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

//Add a 'close' event handler for the client socket
client.on('close', function() {
    console.log('Connection closed');
});/**
 * http://usejsdoc.org/
 */
