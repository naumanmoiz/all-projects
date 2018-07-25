var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

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
router.get('/register', function(req, res){
	console.log('got into register get function ');
	res.redirect('/register.shtml');
});

// Login
router.get('/login', function(req, res){
	console.log('got into login get function users.js');
	res.redirect('/login.shtml');
});

// Register User
router.post('/register', function(req, res){
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
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors){
		res.render('../users/register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash('success_msg', 'You are registered and can now login');

		res.redirect('/users/login');
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
	  console.log('got into this method')
   User.getUserByUsername(username, function(err, user){
	   console.log('this is checking for getuserbyname');
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
	console.log('got into router post login  function users & logged in successfully'+ req.user.username);
	req.flash('success_msg', 'You are logged in');
	
	
	res.redirect('/index.shtml');
	
    //res.redirect('/');
  });

router.get('/logout', function(req, res){
	console.log('got into router logout get function users');
	req.logout();

	req.flash('success_msg', 'You are logged out');
	//res.redirect('/success?username='+req.user.username);
	res.redirect('/users/login');
});

module.exports = router;