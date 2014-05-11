var crypto = require('crypto');

/**
* 随机生成session id
*/
exports.generateSid = function (length){
	return crypto.randomBytes(length).toString('hex');
}
