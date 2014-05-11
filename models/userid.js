var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 用户id
var UseridSchema = new Schema({
	uid: Number,
	count: Number
});

UseridSchema.statics = {
	// 获取最大的用户id
	makeUid: function (cb) {
      	this.findOne({}).sort('-uid').limit(1).exec(cb);
	}
}

mongoose.model('Userid', UseridSchema);
