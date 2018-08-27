var express = require("express");
var net = require('net');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var users = require('./routes/users');


require('events').EventEmitter.defaultMaxListeners = 3;

mongoose.connect('process.env.MONGODB_URI');
var db = mongoose.connection;

var app     = express();
var client = new net.Socket();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(__dirname + '/routes'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/public'));
//Set Static Folder
//app.use(express.static(path.join(__dirname, 'public')));
//Store all JS and CSS in Scripts folder.
//app.use(express.static(__dirname + '/views'));

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');




//Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

/*app.use(function (req, res, next) {
	  console.log('Time:', Date.now())
	  next()
	})*/


app.use('/', routes);
app.use('/users', users);






/*app.get('/users/buckConverter', function(req, res) {
	console.log("app.get users/buckConverter");
	
        res.sendFile(__dirname + "/" + "routes/BC1.html");
    });*/



app.post('/BC2', function(req, res){
/*        req_input = {
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
        console.log("Hi i am here");*/

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
	console.log('got into get function which is dir + index.shtml');
  res.sendFile(__dirname + '/routes/index.shtml');
  //It will find and locate index.html from View or Scripts
});



//Set Port
app.set('port', (process.env.PORT || 80));

app.listen(app.get('port'), function(err,next){

	console.log('Server started on port '+app.get('port'));
});
