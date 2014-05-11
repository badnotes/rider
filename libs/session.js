var session = function (time, sid, uname){
	
	this.time = time; // 当前时间
	this.sid = sid;   // 随机字符串
    this.name = uname;
}

module.exports = session;