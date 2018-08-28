var express = require('express');
var bodyParser = require('body-parser');
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
//var routes = require('./routes/index');
//var users = require('./routes/users');
var router = express.Router();

var client = new net.Socket();
var app = express();

/*

mongoose.connect('process.env.MONGODB_URI');
var db = mongoose.connection;

var app     = express();
var client = new net.Socket();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());*/

var User = require('../models/user');

// Register
router.get('/register', function(req, res) {
	console.log('got into register get function ');
	res.render('register');
});

// Login
router.get('/login', function(req, res) {
	console.log('got into login get function users.js');
	res.render('login');
});

router.get('/gallery', function(req, res) {
	console.log('got into gallery get function users.js');
	res.render('gallery');
});

router.get('/contact', function(req, res) {
	console.log('got into gallery get function users.js');
	res.render('contact');
});

router.get('/people', function(req, res) {
	console.log('got into gallery get function users.js');
	res.render('people');
});
router.get('/buckConverter', function(req, res) {
	console.log('got into buckConverter get function users.js');
	res.render('buckConverter');
});
router.get('/solar', function(req, res) {
	console.log('got into solar get function users.js');
	res.render('solar');
});

router.get('/boost', function(req, res) {
	console.log('got into boost get function users.js');
	res.render('boostConverter');
});

router.get('/about', function(req, res) {
	console.log('got into about get function users.js');
	res.render('about');
});

// Register User
router.post('/register', function(req, res) {
	console.log('got into register post function users');
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(
		req.body.password
	);

	var errors = req.validationErrors();

	if (errors) {
		res.render('register', {
			errors: errors
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user) {
			if (err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(
	new LocalStrategy(function(username, password, done) {
		console.log('got into this method');
		User.getUserByUsername(username, function(err, user) {
			console.log('this is checking for getuserbyname');
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function(
				err,
				isMatch
			) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	})
);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.getUserById(id, function(err, user) {
		done(err, user);
	});
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/users/login',
		failureFlash: true
	}),
	function(req, res) {
		console.log(
			'got into router post login  function users & logged in successfully' +
				req.user.username
		);
		req.flash('success_msg', 'You are logged in');

		//res.render('login');

		res.redirect('/');
	}
);

router.post('/buckConverter', function(req, res) {
	console.log('router post users/buckConverter');
	req_input = {
		Vin: req.body.Vin,
		Du: req.body.Du,
		Lu: req.body.Lu,
		Cu: req.body.Cu,
		Ru: req.body.Ru,
		r1: req.body.r1,
		Fu: req.body.Fu
	};

	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred
	//using the server
	console.log(req_input);

	//convert the response in JSON format
	//  res.sendFile(__dirname + "/" + "routes/BC1.html");
	//res.sendfile(JSON.stringify(response));
	client.connect(
		6801,
		'127.0.0.1',
		function() {
			console.log('Connected');
			client.write(JSON.stringify(req_input));
		}
	);

	client.on('data', function(data) {
		//console.log('Received :' + data);
		//console.log(data +"before parse");
		outputobj = JSON.parse(data);

		console.log('Vo : ' + outputobj['input cluster'].Vo);
		var Vo = outputobj['input cluster'].Vo;
		var Io = outputobj['input cluster'].Io;
		var P = outputobj['input cluster'].P;
		var deltaIL = outputobj['input cluster'].deltaIL;
		var Time = outputobj.Time;
		var outputData = outputobj['Outputs Data'];
		console.log('Io : ' + outputobj['input cluster'].Io);
		console.log('P  : ' + outputobj['input cluster'].P);
		console.log('dIL: ' + outputobj['input cluster'].deltaIL);
		console.log('time' + outputobj.Time);
		console.log('Outputs Data' + outputobj['Outputs Data']);

		//          google.charts.load('current', {packages: ['corechart']});
		//          google.charts.setOnLoadCallback(drawChart);
		//               function drawChart() {
		//                   // Define the chart to be drawn.
		//                   var data = new google.visualization.DataTable();
		//                   data.addColumn('string', 'Name');
		//                   data.addColumn('number', 'Values');
		//                   var i;
		//                   //values = $('#graphData').text.data1
		//
		//                   for (i in outputobj.Time,outputObj["Outputs Data"]) {
		//                	   console.log(i + "this is I");
		//                	   console.log(i + "this is j");
		//
		//                       data.addRows([[, data1[i]]]);
		//                   }
		//                   //j = "<h3>" + values + "</h3>";
		//                  // document.getElementById('cid').innerHTML = j;
		//
		//                   //ate and draw the chart.
		//                   var chart = new google.visualization.LineChart(document.getElementById('myLineChart'));
		//                   chart.draw(data, null);
		//               }

		//  console.log("Outputs data" + outputobj.O)

		for (var i in outputobj) {
			console.log('objects are');
			console.log(i);
		}
		//  res.render('graphvalues',data);

		// req.flash(JSON.stringify(outputobj));
		//   res.end(JSON.stringify(outputobj));
		//res.redirect('/');
		// var context = JSON.stringify(outputobj);
		res.render('buckConverter', {
			outputobj: outputobj,
			Vo: Vo,
			Io: Io,
			P: P,
			deltaIL: deltaIL
		});

		client.destroy(); // kill client after server's response
	});

	client.on('error', function(ex) {
		console.log('handled error');
		console.log(ex);
	});

	//  res.end(JSON.stringify(data));

	client.on('close', function() {
		console.log('Connection closed');
	});
});

router.post('/solarPanel', function(req, res) {
	console.log('router post users/solarPanel');
	req_input = {
		Rs: req.body.Rs,
		Rsh: req.body.Rsh,
		Il: req.body.Il,
		IR: req.body.IR,
		Cin: req.body.Cin,
		Cip: req.body.Cip
	};

	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred
	//using the server
	console.log(req_input);

	//convert the response in JSON format
	//  res.sendFile(__dirname + "/" + "routes/BC1.html");
	//res.sendfile(JSON.stringify(response));
	client.connect(
		7801,
		'127.0.0.1',
		function() {
			console.log('Connected');
			client.write(JSON.stringify(req_input));
		}
	);

	client.on('data', function(data) {
		//console.log('Received :' + data);
		//console.log(data +"before parse");
		outputobj = JSON.parse(data);

		console.log(outputobj);
		/*var Rs = outputobj['input cluster'].Rs;
		var Rsh = outputobj['input cluster'].Rsh;
		var Il = outputobj['input cluster'].Il;
		var IR = outputobj['input cluster'].IR;
		var Cin = outputobj['input cluster'].Cin;
		var Cip = outputobj['input cluster'].Cip;*/

		var outputData = outputobj['Outputs Data'];
		/* console.log('Rs : ' + outputobj['input cluster'].Rs);
		console.log('Rsh  : ' + outputobj['input cluster'].Rsh);
		console.log('Il: ' + outputobj['input cluster'].Il);
		console.log('IR: ' + outputobj['input cluster'].IR);
		console.log('Cin: ' + outputobj['input cluster'].Cin);
		console.log('Cip: ' + outputobj['input cluster'].Cip); */

		console.log('Outputs Data' + outputobj['Outputs Data']);

		for (var i in outputobj) {
			console.log('objects are');
			console.log(i);
		}

		res.render('solar', {
			outputobj: outputobj
		});

		client.destroy(); // kill client after server's response
	});

	client.on('error', function(ex) {
		console.log('handled error');
		console.log(ex);
	});

	client.on('close', function() {
		console.log('Connection closed');
	});
});

router.post('/boostConverter', function(req, res) {
	console.log('router post users/boostConverter');
	req_input = {
		Vin: req.body.Vin,
		Du: req.body.Du,
		Lu: req.body.Lu,
		Cu: req.body.Cu,
		Ru: req.body.Ru,
		r1: req.body.r1,
		Fu: req.body.Fu
	};

	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred
	//using the server
	console.log(req_input);

	//convert the response in JSON format
	//  res.sendFile(__dirname + "/" + "routes/BC1.html");
	//res.sendfile(JSON.stringify(response));
	client.connect(
		8901,
		'127.0.0.1',
		function() {
			console.log('Connected');
			client.write(JSON.stringify(req_input));
		}
	);

	client.on('data', function(data) {
		//console.log('Received :' + data);
		//console.log(data +"before parse");
		outputobj = JSON.parse(data);

		console.log('Vo : ' + outputobj['input cluster'].Vo);
		var Vo = outputobj['input cluster'].Vo;
		var Io = outputobj['input cluster'].Io;
		var P = outputobj['input cluster'].P;
		var deltaIL = outputobj['input cluster'].deltaIL;
		var Time = outputobj.Time;
		var outputData = outputobj['Outputs Data'];
		console.log('Io : ' + outputobj['input cluster'].Io);
		console.log('P  : ' + outputobj['input cluster'].P);
		console.log('dIL: ' + outputobj['input cluster'].deltaIL);
		console.log('time' + outputobj.Time);
		console.log('Outputs Data' + outputobj['Outputs Data']);

		for (var i in outputobj) {
			console.log('objects are');
			console.log(i);
		}
		//  res.render('graphvalues',data);

		// req.flash(JSON.stringify(outputobj));
		//   res.end(JSON.stringify(outputobj));
		//res.redirect('/');
		// var context = JSON.stringify(outputobj);
		res.render('buckConverter', {
			outputobj: outputobj,
			Vo: Vo,
			Io: Io,
			P: P,
			deltaIL: deltaIL
		});

		client.destroy(); // kill client after server's response
	});

	client.on('error', function(ex) {
		console.log('handled error');
		console.log(ex);
	});

	//  res.end(JSON.stringify(data));

	client.on('close', function() {
		console.log('Connection closed');
	});
});

router.get('/logout', function(req, res) {
	console.log('got into router logout get function users');
	req.logout();

	req.flash('success_msg', 'You are logged out');
	//res.redirect('/success?username='+req.user.username);
	res.redirect('/users/login');
});

module.exports = router;
