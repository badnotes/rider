var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, required: true, index: { unique: true, sparse: true }, set: toLower},
	salt: String,
	pass: String,
	email: String,
	phone: String,
	photo: String,
	age: Number,
	city: String
});

function toLower(string) {
    return string.toLowerCase();
}

mongoose.model('User', UserSchema);
