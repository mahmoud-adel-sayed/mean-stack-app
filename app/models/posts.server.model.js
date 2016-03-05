var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var postSchema = new Schema({
	created:{
		type: Date,
		default: Date.now
	},
	title:{
		type: String,
		trim: true,
		required: 'Title is required'
	},
	content:{
		type: String,
		required: 'Content is required'
	},
	image:{
		type: String
	},
	aws:{
		type: String
	},
	creator:{
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Posts' , postSchema);