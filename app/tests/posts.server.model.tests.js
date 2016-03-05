var app = require('../../server'),
	should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Posts');

var user , post;

describe('Posts model unit tests:', function(){
	beforeEach(function(done){
		user = new User({
			firstName: 'Mahmoud',
			lastName: 'Adel',
			username: 'mahmoudadel',
			email: 'mahmoudtaha939@gmail.com',
			password: '1234567'
		});

		user.save(function(){
			post = new Post({
				title: 'test title',
				content: 'content test',
				creator: user
			});
			done();
		});
	});

	describe('Testing the save method' , function(){
		it('Should be able to save without problems', function(){
			post.save(function(err){
				should.not.exist(err);
			});
		});
		it('Should not be able to save without a title' , function(){
			post.title = '';
			post.save(function(err){
				should.exist(err);
			});
		});
	});

	afterEach(function(done){
		Post.remove(function(){
			User.remove(function(){
				done();
			});
		});
	});
});