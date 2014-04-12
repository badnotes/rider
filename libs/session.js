var session = function (time, sid){
	
	this.time = time; // 当前时间
	this.sid = sid;   // 随机字符串
}

module.exports = session;