var app = require('../../server'),
	should = require('should'),
	request = require('supertest'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Post = mongoose.model('Posts');

var user , post;

describe('Posts controller unit tests:', function(){
	beforeEach(function(done){
		user = new User({
			firstName: 'mahmoud',
			lastName: 'adel',
			username: 'mahmoudadel',
			email: 'mahmoudtaha939@gmail.com',
			password: '1234567'
		});
		user.save(function(){
			post = new Post({
				title: 'test',
				content: 'this is a test',
				creator: user
			});
			post.save(function(){
				done();
			});
		});
	});

	describe('Testing the GET methods', function(){
		it('Should be able to get the posts list', function(done){
			request(app).get('/api/posts')
				.set('Accept' , 'application/json')
				.expect('Content-Type' , /json/)
				.expect(200)
				.end(function(err , res){
					res.body.should.be.instanceof(Array).and.have.lengthOf(1);
					res.body[0].should.have.property('title' , post.title);
					res.body[0].should.have.property('content' , post.content);
					done();
				});
		});
		it('Should be able to get the specific post' , function(done){
			request(app).get('/api/posts/' + post._id)
				.set('Accept' , 'application/json')
				.expect('Content-Type' , /json/)
				.expect(200)
				.end(function(err , res){
					res.body.should.be.an.instanceof(Object).and.have.property('title', post.title);
					res.body.should.have.property('content', post.content);
					done();
				});
		});

	});

	afterEach(function(done){
		User.remove().exec();
		Post.remove().exec();
		done();
	});

});