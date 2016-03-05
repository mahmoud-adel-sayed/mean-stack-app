var mongoose = require('mongoose'),
	Comments = mongoose.model('Comments');

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
	var comment = new Comments(req.body);
	comment.userId = req.user;
	comment.postId = req.post._id;

	comment.save(function(err , comment){
		if(err){
			res.status(400).send({ message: getErrorMessage(err) });
		}else{
			res.json(comment);
		}
	});
};

exports.list = function(req , res){
	Comments.find({postId: req.post._id}).sort('-created').populate('userId' , 'username').exec(function(err , comments){
		if(err){
			res.status(400).send({ message: getErrorMessage(err) });
		}else{
			res.json(comments);
		}
	});
};