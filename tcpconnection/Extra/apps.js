var net = require('net');
//
//var server = net.createServer(function(socket) {
//	socket.write('Echo server\r\n');
//	socket.pipe(socket);
//});
//
//server.listen(1338, '127.0.0.1');
//
//



var client = new net.Socket();
var HOST = '127.0.0.1'; var PORT = '1338';
client.connect(PORT, HOST, function() {
	console.log('Connected' + HOST + PORT);
	client.write('Hello, server! Love, Client.');
	client.push('Hello,world');
	//client.write('Hi');
});


client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});


client.on('error', function(e) {

    while (e.code == 'ECONNREFUSED') {
        console.log('Is the server running at ' + PORT + '?');

        client.setTimeout(4000, function() {

            client.connect(PORT, HOST, function() {
                console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                client.write('I am inner Superman');
            });         

            console.log('Timeout for 5 seconds before trying port:' + PORT + ' again');
        });
    }
});

//client.on('data', function(data) {
//    console.log('DATA: ' + data);
//    client.destroy();
//});

client.on('close', function() {
    console.log('Connection closed');
});

//Add a 'close' event handler for the client socket
//client.on('close', function() {
//    console.log('Connection closed');
//});


//client.on('error', function(err) {
//	   console.log(err)
//	});
////client.forEach(function(client) {
////    client.destroy();
////});
//client.on('close', function() {
//	console.log('Connection closed');
//});

//server.close();