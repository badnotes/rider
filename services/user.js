var models = require('../models');
var User = models.User;

exports.getUserByName = function(name, callback) {
	if (name == null){
		return callback(null, []);
	}
	User.findOne({'name': name}, callback);
};

exports.list = function (page, callback) {
	User.find({}, {'name': 1, '_id': 0}, {skip: (page -1) * 10}, callback);
}

exports.add = function(user, callback) {
	console.log("user is %s.", user);	
	if (user == null){
		return callback(null, []);
	}
	user.save();
}