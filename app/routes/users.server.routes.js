var users = require('../controllers/users.server.controller'),
	passport = require('passport');

module.exports = function(app){
	app.route('/')
		.get(users.renderHome);

	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local',{
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));
	app.get('/signout' , users.signout);

};
