var express = require('express');
var router = express.Router();
const http = require('http');
const bodyParser = require('body-parser');

var { authenticate } = require('../middleware/authenticate');
var app = express();
var net = require('net');
var client = new net.Socket();

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

/* GET buckconverter page. */
router.get('/buckconverter', authenticate, function(req, res, next) {
	res.render('baseNIULoginViews/practicalExperiments/buckConverter', {
		title:
			'Buck Converter (Practical Experiments) - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/logout',
		loginData: 'Logout',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

/* POST buckconverter page. */
router.post('/buckconverter', authenticate, function(req, res, next) {
	var requestInput = {
		voltageInput: req.body.voltageInputBuck,
		dutyCycle: req.body.dutyCycleBuck,
		inductance: req.body.inductanceBuck,
		capacitance: req.body.capacitanceBuck,
		resistance: req.body.resistanceBuck,
		capacitorResistance: 0,
		frequency: req.body.frequencyBuck
	};

	client.connect(
		1337,
		'127.0.0.1',
		function() {
			console.log('Connected');
			client.write(requestInput);
			client.end();
		}
	);

	client.on('data', function(data) {
		console.log('Received: ' + data);
		client.destroy(); // kill client after server's response
	});

	client.on('close', function() {
		console.log('Connection closed');
	});

	res.render('baseNIULoginViews/practicalExperiments/buckConverter', {
		title:
			'Buck Converter (Practical Experiments) - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/logout',
		loginData: 'Logout',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

module.exports = router;
