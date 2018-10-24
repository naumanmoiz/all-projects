var express = require('express');
var router = express.Router();
var { User } = require('../models/user');
const bodyParser = require('body-parser');
var { authenticate } = require('../middleware/authenticate');
var app = express();
var cookieParser = require('cookie-parser');

/**
 * bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

/**
 * bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

/* GET index page. */
router.get('/index', authenticate, function(req, res, next) {
	res.render('baseNIULoginViews/index', {
		title: 'Index of Experiments - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/logout',
		loginData: 'Logout',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.render('baseNIULoginViews/login', {
		title: 'Login - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/register',
		loginData: 'Register',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

/* POST login page. */
router.post('/login', function(req, res, next) {
	User.findByCredentials(req.body.userEmailAddress, req.body.userPassword)
		.then(user => {
			return user.generateAuthToken().then(token => {
				res.cookie('x_auth', token);
				res.redirect('/users/index').send();
			});
		})
		.catch(e => {
			res.status(400).send();
		});
});

/* GET register page. */
router.get('/register', function(req, res, next) {
	res.render('baseNIULoginViews/register', {
		title: 'Register - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/login',
		loginData: 'Login',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

/* POST register page. */
router.post('/register', function(req, res, next) {
	var user = new User({
		email: req.body.userRegisterEmailAddress,
		password: req.body.userRegisterPassword,
		firstName: req.body.userRegisterFirstName,
		lastName: req.body.userRegisterLastName,
		education: req.body.userRegisterEducation,
		securityAnswer: req.body.userRegisterSecurityAnswer
	});

	console.log(user);

	user.save(function(err) {
		if (err) {
			if (err.name === 'MongoError' && err.code === 11000) {
				// Duplicate username
				res.render('baseNIULoginViews/register', {
					title: 'Register - NIU - Virtual Renewable Energy Laboratory',
					loginLink: '/users/login',
					failureMessage: 'Please check your email address!',
					loginData: 'Login',
					layout: 'layouts/baseNIULoginLayout.hbs'
				});
			}
		} else {
			user.generateAuthToken();

			res.render('baseNIULoginViews/register', {
				title: 'Register - NIU - Virtual Renewable Energy Laboratory',
				loginLink: '/users/login',
				successMessage: 'You are successfully registered!',
				loginData: 'Login',
				layout: 'layouts/baseNIULoginLayout.hbs'
			});
		}
	});
});

/* GET logout page. */
router.get('/logout', function(req, res, next) {
	res.clearCookie('x_auth');
	res.redirect('/users/login');
});

/* GET forgot password page. */
router.get('/forgotpassword', function(req, res, next) {
	res.render('baseNIULoginViews/forgotpassword', {
		title: 'Forgot Password - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/login',
		loginData: 'Login',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

module.exports = router;
