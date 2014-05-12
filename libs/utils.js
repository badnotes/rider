var crypto = require('crypto');
var fs = require('fs');
var path = require('path');

/**
* 随机生成session id
*/
exports.generateSid = function (length){
	return crypto.randomBytes(length).toString('hex');
};

exports.generateDatePath = function (){
    var date = new Date();
    return "/" + date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate() + "/";
};

exports.generateSecondPath = function (){
    return this.generateDatePath() + this.loadMilliseconds() + "/";
};

exports.loadMilliseconds = function (){
    return new Date().getMilliseconds();
};

// 创建所有目录
exports.mkdirs = function mkdirs(dirpath, mode, callback) {
    fs.exists(dirpath, function(exists) {
        if(exists) {
            callback(dirpath);
        } else {
            //尝试创建父目录，然后再创建当前目录
            mkdirs(path.dirname(dirpath), mode, function(){
                fs.mkdir(dirpath, mode, callback);
            });
        }
    });
};
