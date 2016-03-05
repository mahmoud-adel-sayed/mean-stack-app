var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		index: true,
		match: [/.+\@.+\..+/ , 'Please fill a valid e-mail address']
	},
	username: {
		type: String,
		trim: true,
		unique: true,
		required: 'Username is required'
	},
	password: {
		type: String,
		required: 'password is required',
		validate: {
			validator: function(password){
				return password && password.length > 6;
			},
			message: 'Password should be longer'
		}
	},
	salt: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
});

// hashing password
UserSchema.pre('save', function(next) {
	if (this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User' , UserSchema);
