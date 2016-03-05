var User = require('mongoose').model('User'),
	passport = require('passport');

var getErrorMessage = function(err){
	var message = '';
	if(err.code){
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
			break;
			default:
				message = 'Something went wrong';
		}
	}else{
		for(var errName in err.errors){
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}
	return message;
};

exports.renderSignup = function(req , res , next){
	if(!req.user){
		res.render('signup' , {
			title: 'Sign Up',
			messages: req.flash('error')
		});
	}else{
		res.redirect('/');
	}
};

exports.renderHome = function(req , res , next){
	if(!req.user){
		res.redirect('/signup');
	}else{
		res.render('index', {
			title: 'Home page',
			user: JSON.stringify(req.user)
		});
	}
};

exports.renderSignin = function(req , res , next){
	if(!req.user){
		res.render('signin' , {
			title: 'Sign In',
			messages: req.flash('error') || req.flash('info')
		});
	}else{
		res.redirect('/');
	}
};

exports.signup = function(req , res , next){
	if(!req.user){
		var user = new User(req.body);
		var message = null;
		user.save(function(err , user){
			if(err){
				var message = getErrorMessage(err);
				req.flash('error' , message);
				return res.redirect('/signup');
			}
			req.login(user , function(err){
				if(err){
					return next(err);
				}
				return res.redirect('/'); 
			});
		});
	}else{
		return res.redirect('/');
	}
};

exports.signout = function(req , res){
	req.logout();
	res.redirect('/');
};

exports.requiresLogin = function(req , res, next){
	if(!req.isAuthenticated()){
		return res.status(401).send({ message: 'User is not logged in.' });
	}
	next();
};