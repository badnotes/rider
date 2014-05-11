var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActivitySchema = new Schema({
	uid: Number,
	startTime: Date,
	endTime: Date,
	path: [{lat:Number, lng:Number}]
});

mongoose.model('Activity', ActivitySchema);
