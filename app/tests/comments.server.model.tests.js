var app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Posts'),
	Comment = mongoose.model('Comments'),
	should = require('should');

var user , post , comment;

describe('Comments model unit tests:' , function(){
	beforeEach(function(done){
		user = new User({
			firstname: 'mahmoud',
			lastname: 'adel',
			username: 'mahmoudadel',
			password: '1234567'
		});
		user.save(function(){
			post = new Post({
				title: 'test',
				content: 'this is a test .',
				creator: user
			});
			post.save(function(){
				comment = new Comment({
					userId: user,
					postId: post._id,
					content: 'yes it is .'
				});
				done();
			});
		});
	});

	describe('Testing the save method' , function(){

		it('Should be able to save without problems' , function(){
			comment.save(function(err){
				should.not.exist(err);
			});
		});

		it('Should not be able to save without a content', function(){
			comment.content = '';
			comment.save(function(err){
				should.exist(err);
			});
		});

	});

	afterEach(function(done){
		User.remove().exec();
		Post.remove().exec();
		Comment.remove().exec();
		done();
	});
});