var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserInfoSchema = new Schema({
	name: {type: String, required: true, index: { unique: true, sparse: true }},
	photo: String,
	age: Number,
	city: String
});


mongoose.model('User_info', UserInfoSchema);
