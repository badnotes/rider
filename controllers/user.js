var crypto = require('crypto');
var User = require('../services').User;
var UserModel = require('../models').User;
var Result = require('../libs/result');
var Utils = require('../libs/utils');
var Constants = require('../libs/constants');
var log4js = require('log4js');
var logger = log4js.getLogger();
var fs = require('fs');

/**
* login
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
            res.json(Result.build(Result.ERROR_NO_RESULT, "", "user name or password is not incorrect."));
			return;
		}
		var _md5 = crypto.createHash('md5');
		if (user.pass === _md5.update(_pass + user.salt, 'utf8').digest('hex') ){
			var _sid = Utils.generateSid(16);
			callback(user.name, _sid);
            //res.json(Result.build(Result.SUCCESS, {"token": _sid}));
            res.json(Result.SUCCESS.build({"token": _sid}));
			return ;
		}
		//JSON.stringify(result)
		res.json(Result.build(Result.ERROR_NO_RESULT, "", "user name or password is not incorrect."));
	});
};

/**
* user list
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
			res.json(Result.ERROR_NO_RESULT);
			return;
		}
		logger.info("find users count: " + users.length);
		res.json(Result.build(Result.SUCCESS, users));
	});
};

/**
* new a user
*/
exports.add = function (req, res, next) {
	var _name = req.query.name;
	var _pass = req.query.pass;
	logger.info(" add user, name is :" + _name);
	if (_name === undefined || _pass === undefined 
		|| _name === "" || _pass === ""){
		res.json(Result.build(Result.ERROR_PARAMS,"name or pass is null."));
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
	res.json(Result.SUCCESS);
};

/*
* load user photo by user name
*/
exports.photo = function (req, res, next) {
    var _name = req.query.name;
    User.photo(_name, function(err, user){
        if (err) {
            return next(err);
        }
        if (!user) {
            res.json(Result.ERROR_NO_RESULT);
            return;
        }
        res.json(Result.SUCCESS.build({'photo': user.photo}));
    });
};

/*
* update user photo
 */
exports.updatePhoto = function (req, res, next) {
	var _name = req.query.name;
	var base64photo = req.body.photo;
    if(!base64photo){
        res.json(Result.ERROR_PARAMS);
        return;
    }
    var datePath = Utils.generateSecondPath();
    var filePath = Constants.photo_path + datePath;
    var fileName =  _name + Constants.photo_format;
    var fileUrl = Constants.photo_host + datePath + fileName;
    Utils.mkdirs(filePath, "0777", function(){
        fs.writeFile(filePath + fileName, base64photo, 'base64', function(err) {
            if(err) {
                logger.error(err);
                next(err);
            } else {
                logger.info(fileUrl);
                User.updatePhoto(_name, fileUrl, function() {
                    if(err) {
                        logger.error(err);
                        next(err);
                    }
                    else{
                        res.json(Result.SUCCESS);
                    }
                });
            }
        });
    });
};

/*
* update user background
 */
exports.updateBg = function (req, res, next) {
    var _name = req.query.name;
    var base64Bg = req.body.background;
    if(!base64Bg){
        res.json(Result.ERROR_PARAMS);
        return;
    }
    var datePath = Utils.generateSecondPath();
    var filePath = Constants.background_path + datePath;
    var fileName =  _name + Constants.background_format;
    var fileUrl = Constants.background_host + datePath + fileName;
    Utils.mkdirs(filePath, "0777", function(){
        fs.writeFile(filePath + fileName, base64Bg, 'base64', function(err) {
            if(err) {
                logger.error(err);
                next(err);
            } else {
                logger.info(fileUrl);
                User.updateBackground(_name, fileUrl, function() {
                    if(err) {
                        logger.error(err);
                        next(err);
                    }
                    else{
                        res.json(Result.SUCCESS);
                    }
                });
            }
        });
    });
};