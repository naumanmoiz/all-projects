var express = require("express");
var bodyParser = require('body-parser');
var net = require('net');
var app     = express();
var client = new net.Socket();

require('events').EventEmitter.defaultMaxListeners = 3;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/routes'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Store all JS and CSS in Scripts folder.
//app.use(express.static(__dirname + '/views'));


app.get('/BC1', function(req, res) {
        res.sendFile(__dirname + "/" + "routes/BC1.html");
    });


app.post('/BC1', function(req, res){
        req_input = {
             Vin : req.body.Vin,
              Du : req.body.Du,
              Lu : req.body.Lu,
              Cu : req.body.Cu,
              Ru : req.body.Ru,
              r1 : req.body.r1,
              Fu : req.body.Fu
              };

        //this line is optional and will print the response on the command prompt
        //It's useful so that we know what infomration is being transferred
        //using the server
        console.log(req_input);

        //convert the response in JSON format
      //  res.sendFile(__dirname + "/" + "routes/BC1.html");
        //res.sendfile(JSON.stringify(response));
        client.connect(6801, '127.0.0.1', function() {
        	console.log('Connected');
        	client.write(JSON.stringify(req_input));
        });

        client.on('data', function(data) {
        	console.log('Received :' + data);
          //console.log(data +"before parse");
          outputobj = JSON.parse(data);
          console.log(outputobj +"after parse");


          console.log("Vo : " + outputobj.Vo);
          console.log("Io : " + outputobj.Io);
          console.log("P  : " + outputobj.P);
          console.log("dIL: " + outputobj.deltaIL);
          console.log("time" + outputobj.Time);
          console.log("Outputs Data" + outputobj["Outputs Data"]);
        //  console.log("Outputs data" + outputobj.O)
          for(var i in outputobj){
            console.log("objects are");
            console.log(i);
          }
        //  res.render('graphvalues',data);



          //console.log(typeof(outputobj.deltaIL));
          res.end(JSON.stringify(outputobj));

        	client.destroy(); // kill client after server's response
        });





        client.on('error',function(ex) {
          console.log("handled error");
          console.log(ex);
        }
      );

      //  res.end(JSON.stringify(data));

        client.on('close', function() {
        	console.log('Connection closed');
        });

});

app.post('/BC2', function(req, res){
        req_input = {
             Vin : req.body.Vin,
              Du : req.body.Du,
              Lu : req.body.Lu,
              Cu : req.body.Cu,
              Ru : req.body.Ru,
              r1 : req.body.r1,
              Fu : req.body.Fu
              };

        //this line is optional and will print the response on the command prompt
        //It's useful so that we know what infomration is being transferred
        //using the server
        console.log(req_input);
        console.log("Hi i am here");

        //convert the response in JSON format
      //  res.sendFile(__dirname + "/" + "routes/BC1.html");
        //res.sendfile(JSON.stringify(response));
        client.connect(9601, '127.0.0.1', function() {
        	console.log('Connected');
        	client.write(JSON.stringify(req_input));
        });

        // client.on('data', function(data) {
        // 	console.log('Received: ' + data);
        //   outputobj = JSON.parse(data);
        //   console.log("Vo : " + outputobj.Vo);
        //   console.log("Io : " + outputobj.Io);
        //   console.log("P  : " + outputobj.P);
        //   console.log("dIL: " + outputobj.deltaIL);
        //   console.log(typeof(outputobj.deltaIL));
        //   res.end(JSON.stringify(outputobj));
        // 	client.destroy(); // kill client after server's response
        // });

      //  res.end(JSON.stringify(data));

        client.on('close', function() {
        	console.log('Connection closed');
        });

});
/*
function Juice() {

console.log('Connected');

//client.write(response);

}
*/

app.get('/',function(req,res){
  res.sendFile(__dirname + '/routes/index.shtml');
  //It will find and locate index.html from View or Scripts
});



app.listen(process.env.PORT || 3000);
