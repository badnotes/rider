var user = require('./controllers/user');
var Result = require('./libs/result');
var Session = require('./libs/session');
var HashMap = require('hashmap').HashMap;


// 存储在线用户
var userMap = new HashMap();
var authValidity = 1000 * 60 * 60 * 24;

module.exports = function (app){
	
	/* 验证是否已经登录 */
	app.use(authChecker);
	
	/* 登录并回传用户信息 */
	app.get('/login', function(req, res, next) {
		user.login(req, res, next, function(uname, sid){
			userMap.set(uname,new Session(nowTime(), sid ));
			console.log("Now online user size: " + userMap.count());
		});
	});
	
	app.get('/users', user.users);
	app.get('/signup', user.add);
};

// 认证用户信息
function authChecker(req, res, next) {
	var name = req.query.name;
	var sid = req.query.sid;
	/* 登录或注册 */
	if (req.path === "/login" || req.path === "/signup"){
		next();
		return;
	}
	if (userMap.has(name)){
		var session = userMap.get(name);
		if (session.sid === sid){
			if ( nowTime() - session.time  < authValidity){
				next();
				return;
			}
		}
	}
	res.json(new Result(406, ""));
}

function nowTime(){
	return new Date().getTime();
}
