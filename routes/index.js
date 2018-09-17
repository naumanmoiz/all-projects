var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('baseNIUViews/index', {
		title: 'Home - NIU - Virtual Renewable Energy Laboratory',
		layout: 'layouts/baseNIULayout.hbs'
	});
});

/* GET gallery page. */
router.get('/gallery', function(req, res, next) {
	res.render('baseNIUViews/gallery', {
		title: 'Gallery - NIU - Virtual Renewable Energy Laboratory',
		layout: 'layouts/baseNIULayout.hbs'
	});
});

/* GET buckConverter page. */
router.get('/buckConverter', function(req, res, next) {
	res.render('baseNIUViews/experiments/buckConverter', {
		title: 'Buck Converter - NIU - Virtual Renewable Energy Laboratory',
		layout: 'layouts/baseNIULayout.hbs'
	});
});

/* GET solarPanel page. */
router.get('/solarPanel', function(req, res, next) {
	res.render('baseNIUViews/experiments/solarPanel', {
		title: 'Solar Panel - NIU - Virtual Renewable Energy Laboratory',
		layout: 'layouts/baseNIULayout.hbs'
	});
});

/* GET boostConverter page. */
router.get('/boostConverter', function(req, res, next) {
	res.render('baseNIUViews/experiments/boostConverter', {
		title: 'Boost Converter - NIU - Virtual Renewable Energy Laboratory',
		layout: 'layouts/baseNIULayout.hbs'
	});
});

module.exports = router;
