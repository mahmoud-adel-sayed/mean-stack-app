var User = require('mongoose').model('User'),
		getErrorMessage = require('./error.server.controller'),
		AWS = require('../../config/aws');

exports.editProfile = function(req , res){
	var userId = req.user._id;

	if(req.file){
		req.body.image = req.file.filename;
		req.body.aws = 'https://s3.amazonaws.com/mahmoudadel/'+req.file.filename;
		AWS.onFileUploadData(req.file.filename , req.file.path , req.file.mimetype);
	}
	
	var profile = req.body;

	User.findOneAndUpdate({_id: userId} , profile , { new: true , runValidators: true } , function(err , profile){
		if(err) return res.status(400).send({ message: getErrorMessage(err) });
		res.json(profile);
	});
};

exports.changePassword = function(req , res){
	var userId = req.user._id,
			oldPassword = req.body.oldPass,
			newPassword = req.body.newPass,
			confirmPassword = req.body.confirmPass;

	if(!oldPassword){
		return res.status(400).send({ message: 'Please enter your old password' });
	}else if(newPassword !== confirmPassword){
		return res.status(400).send({ message: 'new & confirm password do not match' });
	}else{
		User.findOne({_id: userId} , function(err , user){
			if(err){
				return res.status(400).send({ message: getErrorMessage(err) });
			}else if(!user.authenticate(oldPassword)){
				return res.status(400).send({ message: 'your old password is wrong' });
			}else{
				user.password = newPassword;
				user.save(function(err , newuser){
					if(err) return res.status(400).send({ message: getErrorMessage(err) });
					req.logout();
					res.status(200).end();
				});
			}
		});
	}
};
