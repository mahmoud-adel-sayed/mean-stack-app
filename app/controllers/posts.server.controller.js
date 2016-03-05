var mongoose = require('mongoose'),
	Posts = mongoose.model('Posts'),
	del = require('del'),
	AWS = require('../../config/aws');

var getErrorMessage = function(err){
	if(err.errors){
		for(var errorName in err.errors){
			if(err.errors[errorName].message) return err.errors[errorName].message;
		}
	}else{
		return 'Unknown Server Error';
	}
};

exports.create = function(req , res){
	var post = new Posts(req.body);
	post.creator = req.user;

	if(req.file){
		post.image = req.file.filename;
		post.aws = 'https://s3.amazonaws.com/mahmoudadel/'+req.file.filename;
		AWS.onFileUploadData(req.file.filename , req.file.path , req.file.mimetype);
	}

	post.save(function(err , post){
		if(err){
			return res.status(400).send({ message: getErrorMessage(err) });
		}else{
			res.json(post);
		}
	});
};

exports.list = function(req , res){
	Posts.find().sort('-created').populate('creator', 'firstName lastName username').exec(function(err , posts){
		if(err){
			return res.status(400).send({ message: getErrorMessage(err) });
		}else{
			res.json(posts);
		}
	});
};

exports.postById = function(req , res , next , id){
	Posts.findById({_id: id}).populate('creator' ,'firstName lastName username').exec(function(err , post){
		if(err){
			return next(err);
		}
		if(!post){
			return next(new Error('post not found'));
		}
		req.post = post;
		next();
	});
};

exports.read = function(req , res){
	res.json(req.post);
};

exports.update = function(req , res){
	var post = req.post;
	post.title = req.body.title;
	post.content = req.body.content;

	post.save(function(err , post){
		if(err){
			return res.status(400).send({ message: getErrorMessage(err) });
		}else{
			res.json(post);
		}
	});
};

exports.delete = function(req , res){
	var post = req.post;
	var image = req.post.image;

	post.remove(function(err , post){
		if(err){
			return res.status(400).send({ message: getErrorMessage(err) });
		}else{
			if(image){
				del.sync('public/uploads/'+ image);
			}
			res.json(post);
		}
	});
};

exports.hasAuthorization = function(req , res , next){
	if(req.post.creator.id !== req.user.id){
		return res.status(403).send({ message: 'User is not authorized.' });
	}
	next();
};
