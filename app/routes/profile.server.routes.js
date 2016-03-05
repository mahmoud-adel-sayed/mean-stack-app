var profile = require('../controllers/profile.server.controller'),
		users = require('../controllers/users.server.controller');

module.exports = function(app){
	app.route('/api/users/profile/edit').
		put(users.requiresLogin , profile.editProfile);

	app.route('/api/users/profile/changePassword').
		put(users.requiresLogin , profile.changePassword);
};
