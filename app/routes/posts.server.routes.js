var users = require('../controllers/users.server.controller'),
	posts = require('../controllers/posts.server.controller'),
	multer = require('multer');

var upload = multer({ 
	dest: 'public/uploads/',
	limits: {fileSize: 500000}
});

module.exports = function(app){
	app.route('/api/posts').
		get(posts.list).
		post(upload.single('file') , users.requiresLogin , posts.create );

	app.route('/api/posts/:postId').
		get(posts.read).
		put(users.requiresLogin , posts.hasAuthorization , posts.update).
		delete(users.requiresLogin , posts.hasAuthorization , posts.delete);

	app.param('postId' , posts.postById);
};