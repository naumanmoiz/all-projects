var { User } = require('./../models/user');
var cookieParser = require('cookie-parser');

var authenticate = (req, res, next) => {
	var token = req.cookies.x_auth;

	User.findByToken(token)
		.then(user => {
			if (!user) {
				return Promise.reject();
			}
			req.user = user;
			req.token = token;
			next();
		})
		.catch(e => {
			res.status(400);
		});
};

module.exports = { authenticate };
