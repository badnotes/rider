var mongoose = require('mongoose');
var config = require('../config').config;

mongoose.connect(config.db, function (err){
	if (err){
		console.error('connect to %s error. ', config.db, err.message);
		process.exit(1);
	}
});

require('./user');
require('./activity');
require('./userid');

exports.User = mongoose.model('User');
exports.Activity = mongoose.model('Activity');
exports.Userid = mongoose.model('Userid');
