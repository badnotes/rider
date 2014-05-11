var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: {type: String, required: true, index: { unique: true, sparse: true }, set: toLower},
	uid: Number,
	salt: String,
	pass: String,
	email: String,
	phone: String,
	photo: { type: String, default: ""},
    background: {type: String, default: ""},  // 首页背景图
	age: Number,
	city: String
});

function toLower(string) {
    console.log(string + "t..........");
    return string.toLowerCase();
}


mongoose.model('User', UserSchema);
