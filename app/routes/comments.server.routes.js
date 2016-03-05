var comments = require('../controllers/comments.server.controller'),
	users = require('../controllers/users.server.controller');

module.exports = function(app){
	app.route('/api/posts/:postId/comments').
		get(comments.list).
		post(users.requiresLogin , comments.create);
};