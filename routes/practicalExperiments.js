var express = require('express');
var router = express.Router();
const http = require('http');
const bodyParser = require('body-parser');

var { authenticate } = require('../middleware/authenticate');
var app = express();
var net = require('net');

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
		Vin: req.body.voltageInputBuck,
		Du: req.body.dutyCycleBuck,
		Lu: req.body.inductanceBuck,
		Cu: req.body.capacitanceBuck,
		Ru: req.body.resistanceBuck,
		r1: 0,
		Fu: req.body.frequencyBuck
	};

	var buckOutputData = null;

	const client = net.createConnection({ port: 6801 }, () => {
		// 'connect' listener
		console.log('Connected to server!');
		client.write(JSON.stringify(requestInput));
	});
	  
	client.on('data', (data) => {
		buckOutputData = data;
		client.end();
	});

	client.on('error', function(err) {
		console.log(err);
	});

	client.on('end', () => {
		console.log('Disconnected from server');
		console.log('Recieved' + buckOutputData);

		res.render('baseNIULoginViews/practicalExperiments/buckConverter', {
			title:
				'Buck Converter (Practical Experiments) - NIU - Virtual Renewable Energy Laboratory',
			loginLink: '/users/logout',
			loginData: 'Logout',
			resultData: buckOutputData,
			layout: 'layouts/baseNIULoginLayout.hbs'
		});
	});

});

/* GET solarpanel page. */
router.get('/solarpanel', authenticate, function(req, res, next) {
	res.render('baseNIULoginViews/practicalExperiments/solarpanel', {
		title:
			'Solar Panel (Practical Experiments) - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/logout',
		loginData: 'Logout',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

/* POST solarpanel page. */
router.post('/solarpanel', authenticate, function(req, res, next) {
	var requestInput = {
		Rs: req.body.seriesResistanceSolar,
		Rsh: req.body.shuntResistanceSolar,
		Il: req.body.inductorCurrentSolar,
		IR: req.body.resistorCurrentSolar,
		Cin: req.body.cellsSeriesSolar,
		Cip: req.body.cellsParallelSolar
	};

	var solarOutputData = null;

	const client = net.createConnection({ port: 7801 }, () => {
		// 'connect' listener
		console.log('Connected to server!');
		client.write(JSON.stringify(requestInput));
	});
	  
	client.on('data', (data) => {
		solarOutputData = data;
		client.end();
	});

	client.on('error', function(err) {
		console.log(err);
	});

	client.on('end', () => {
		console.log('Disconnected from server');
		console.log('Recieved' + solarOutputData);

		res.render('baseNIULoginViews/practicalExperiments/solarpanel', {
			title:
				'Solar Panel (Practical Experiments) - NIU - Virtual Renewable Energy Laboratory',
			loginLink: '/users/logout',
			loginData: 'Logout',
			resultData: solarOutputData,
			layout: 'layouts/baseNIULoginLayout.hbs'
		});
	});
});

/* GET boostconverter page. */
router.get('/boostconverter', authenticate, function(req, res, next) {
	res.render('baseNIULoginViews/practicalExperiments/boostConverter', {
		title:
			'Boost Converter (Practical Experiments) - NIU - Virtual Renewable Energy Laboratory',
		loginLink: '/users/logout',
		loginData: 'Logout',
		layout: 'layouts/baseNIULoginLayout.hbs'
	});
});

/* POST boostconverter page. */
router.post('/boostconverter', authenticate, function(req, res, next) {
	var requestInput = {
		Vin: req.body.voltageInputBoost,
		Du: req.body.dutyCycleBoost,
		Lu: req.body.inductanceBoost,
		Cu: req.body.capacitanceBoost,
		Ru: req.body.resistanceBoost,
		r1: 0,
		Fu: req.body.frequencyBoost,
		Ss: req.body.stepSizeBoost,
		Ft: req.body.stepSizeBoost * 10
	};

	var boostOutputData = null;

	const client = net.createConnection({ port: 8901 }, () => {
		// 'connect' listener
		console.log('Connected to server!');
		client.write(JSON.stringify(requestInput));
	});
	  
	client.on('data', (data) => {
		boostOutputData = data;
		client.end();
	});

	client.on('error', function(err) {
		console.log(err);
	});

	client.on('end', () => {
		console.log('Disconnected from server');
		console.log('Recieved' + boostOutputData);

		res.render('baseNIULoginViews/practicalExperiments/boostConverter', {
			title:
				'Boost Converter (Practical Experiments) - NIU - Virtual Renewable Energy Laboratory',
			loginLink: '/users/logout',
			loginData: 'Logout',
			resultData: boostOutputData,
			layout: 'layouts/baseNIULoginLayout.hbs'
		});
	});
});

module.exports = router;
