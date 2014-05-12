var models = require('../models');
var User = models.User;
var Userid = require('../models').Userid;


exports.getUserByName = function(name, callback) {
	if (name == null){
		return callback(null, []);
	}
	User.findOne({'name': name}, callback);
};

exports.list = function (page, callback) {
	User.find({}, {'name': 1, 'uid': 1, '_id': 0}, {skip: (page -1) * 10}, callback);
};

exports.add = function(user, callback) {
	console.log("user is %s.", user);	
	if (user == null){
		return callback(null, []);
	}

	// 生成用户id,将uid保存到userid表,uid从10000开始
	Userid.makeUid(function (err, u) {
		var newuid;
		if(!u){
			newuid = new Userid({uid: 10000, count: 1});	
		}else{
			newuid = new Userid({uid: u.uid +1, count: u.count+1});
		}
		newuid.save();
		user.set('uid', newuid.uid);
		user.save();
	});
};

exports.photo = function (name, callback) {
	User.findOne({'name': name}, {'photo': 1}, callback);
};

exports.updatePhoto = function (name, url, callback) {
    User.update({"name": name}, {$set: {"photo": url}}, callback);
};

exports.updateBackground = function (name, url, callback) {
    User.update({"name": name}, {$set: {"background": url}}, callback);
};