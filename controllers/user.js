var crypto = require('crypto');
var User = require('../services').User;
var UserModel = require('../models').User;
var Result = require('../libs/result');
var Utils = require('../libs/utils');
var log4js = require('log4js');
var logger = log4js.getLogger();

/**
* 用户登录
*/
exports.login = function(req, res, next, callback) {
	var _name = req.query.name;
	var _pass = req.query.pass;
	logger.info("controller/user#login: %s is login.", _name);
	User.getUserByName(_name, function (err, user) {
		if (err) {
			return next(err);
		}
		if (!user) {
			res.json(new Result(403,"user name or password is not incorrect."));
			return;
		}
		var _md5 = crypto.createHash('md5');
		if (user.pass === _md5.update(_pass + user.salt, 'utf8').digest('hex') ){
			var _sid = Utils.generateSid(16);
			callback(user.name, _sid);
			res.json(new Result(200, {sid: _sid}));
			return ;
		}
		//JSON.stringify(result)
		res.json(new Result(403, ""));
	});
};

/**
* 用户列表
*/
exports.users = function (req, res, next) {
	var page = req.query.page;
	if (page === undefined) {
		page = 1;
	}
	var users = User.list(page, function(err, users) {
		if (err) {
			return next(err);
		}
		if (!users) {
			res.json(new Result(403,"users is null"));
			return;
		}
		console.log("find users count: " + users.length);
		res.json(new Result(200, users));
	});
}

/**
* 新增用户
*/
exports.add = function (req, res, next) {
	var _name = req.query.name;
	var _pass = req.query.pass;
	console.log(" add user, name is :" + _name);
	if (_name === undefined || _pass === undefined 
		|| _name === "" || _pass === ""){
		res.json(new Result(400, "name or pass is null."));
		return;
	}
	var _md5 = crypto.createHash('md5');
	var _salt = crypto.randomBytes(8).toString('hex');
	var user = new UserModel({
		name: _name,
		salt: _salt,
		pass: _md5.update(_pass + _salt, 'utf8').digest('hex')
	});
	User.add(user);
	res.json(new Result(200, ""));
}