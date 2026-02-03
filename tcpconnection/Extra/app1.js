// This script will output "Client's question: Hello, world?" and "Server's answer: 42" in alternating order 
// every second until the script is stopped. 
 
var someRandomPort = 1338,
  jot = require('json-over-tcp');
 
var server = jot.createServer(someRandomPort);

 
// Triggered whenever something connects to the server 
function newConnectionHandler(socket){
  // Whenever a connection sends us an object... 
  socket.on('data', function(data){
    // Output the question property of the client's message to the console 
    console.log("Client's question: " + data.question);
 
    // Wait one second, then write an answer to the client's socket 
    setTimeout(function(){
      socket.write({answer: 42});
    }, 1338);
  });
}
 
// Creates one connection to the server when the server starts listening 
function createConnection(){
  // Start a connection to the server 
  var socket = jot.connect(someRandomPort, function(){
    // Send the initial message once connected 
    socket.write({question: "Hello, world?"});
  });
  
  // Whenever the server sends us an object... 
  socket.on('data', function(data){
    // Output the answer property of the server's message to the console 
    console.log("Server's answer: " + data.answer);
    
    // Wait one second, then write a question to the socket 
    setTimeout(function(){
      // Notice that we "write" a JSON object to the socket 
      socket.write({question: "Hello, world?"});
    }, 1338);
  });
}
 
server.on('listening', createConnection);
server.on('connection', newConnectionHandler);
// Start listening 
server.listen(someRandomPort);



//
//var someObject = {
//		  "this property is null": null,
//		  1928: 3734,
//		  turtle: {
//		    neck: "sweater"
//		  }
//		};
//		 
//	connection.write(someObject);