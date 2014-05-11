var user = require('./controllers/user');
var Result = require('./libs/result');
var Session = require('./libs/session');
var HashMap = require('hashmap').HashMap;
var log4js = require('log4js');
var logger = log4js.getLogger();

// 存储在线用户
var userMap = new HashMap();
var authValidity = 1000 * 60 * 60 * 24;

module.exports = function (app){
	
	/* 验证是否已经登录 */
	app.use(authChecker);
	
	/* 登录并回传用户信息 */
	app.get('/login', function(req, res, next) {
		user.login(req, res, next, function(uname, sid){
			userMap.set(sid, new Session(nowTime(), sid, uname));
			logger.info("Now online user size: " + userMap.count());
		});
	});

	app.get('/users', user.users);
	app.post('/signup', user.add);
	app.get('/user/photo', user.photo);
    app.post("/user/photo", user.updatePhoto);
    app.post("/user/background", user.updateBg);

	// 系统错误
	app.use(function(err, req, res, next){
		logger.error(err.stack);
	  	res.json(Result.build(Result.ERROR_INVOKE));
	});
};

// 认证用户信息
function authChecker(req, res, next) {
	var sid = req.query.token;
	/* 登录或注册 */
	if (req.path === "/login" || req.path === "/signup"){
		next();
		return;
	}
	if (userMap.has(sid)){
		var session = userMap.get(sid);
		if (session.sid === sid){
			if ( nowTime() - session.time  < authValidity){
                // 提取出name作为后面接口的参数
                req.query.name = session.name;
				next();
				return;
			}
		}
	}
	//res.json(Result.build(Result.ERROR_SESSION));
	res.json(Result.build(Result.ERROR_SESSION));
}

function nowTime(){
	return new Date().getTime();
}

