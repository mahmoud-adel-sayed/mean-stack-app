var User = require('mongoose').model('User');

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

exports.editProfile = function(req , res){
	var userId = req.user._id;
	var profile = req.body;

	User.findOneAndUpdate({_id: userId} , profile , { new: true , runValidators: true } , function(err , profile){
		if(err){
			return res.status(400).send({ message: getErrorMessage(err) });
		}else{
			res.json(profile);
		}
	});
};

exports.changePassword = function(req , res){
	var userId = req.user._id;
	var oldPassword = req.body.oldPass;
	var newPassword = req.body.newPass;
	var confirmPassword = req.body.confirmPass;

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
					if(err){
						return res.status(400).send({ message: getErrorMessage(err) });
					}else{
						req.logout();
						res.status(200).end();
					}
				});
			}
		});
	}
};
