var profile = require('../controllers/profile.server.controller'),
		users = require('../controllers/users.server.controller'),
		multer = require('multer');

var upload = multer({
	dest: 'public/uploads/',
	limits: {fileSize: 1000000}
});

module.exports = function(app){
	app.route('/api/users/profile/edit').
		put(upload.single('image') , users.requiresLogin , profile.editProfile);

	app.route('/api/users/profile/changePassword').
		put(users.requiresLogin , profile.changePassword);
};
