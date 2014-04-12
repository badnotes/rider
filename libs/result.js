var Result = function (type, data) {
	for (var i in ResultEnum) {
		if (ResultEnum[i].type === type){
			ResultEnum[i].data = data;
			return ResultEnum[i];
		}
	}
	return ResultEnum.ERROR_RESULT;
};

var ResultEnum = {
	SUCCESS: {
		type: 200,
		message: "Success",
		data: ""
	},
	FAIL: {
		type: 300,
		message: "Fail",
		data: ""
	},
	ERROR_PARAMS: {
		type: 400,
		message: "Params is error",
		data: ""	
	},
	ERROR_RESULT: {
		type: 401,
		message: "Result params error.",
		data: ""
	},
	ERROR_NO_RESULT: {
		type: 403,
		message: "nil",
		data: ""
	},
	ERROR_SESSION:{
		type: 406,
		message: "未登录",
		data: ""
	}


	// SUCCESS(				200,"成功"),
	// NEW_VERSION(			201,"有可更新版本"),
	// ERROR_EXECUTE(		300,"业务处理失败"),
	// ERROR_API_VERSION(	301,"接口版本过低"),
	// ERROR_PARAMS(		400,"请求参数错误"),
	// ERROR_RESULT(		401,"result params error");
	// ERROR_MODE(			402,"禁止访问，必须在特定方式下访问"),
	// ERROR_NO_RESULT(		403,"nil"),
	// ERROR_NO_METHOD(		404,"未找到，没有该接口"),
	// ERROR_METHOD(		405,"方法未允许"),
	// ERROR_SESSION(		406,"未登录"),
	// ERROR_ACCESS(		407,"未授权，没有访问权限"),
	// ERROR_INVOKE(		500,"系统错误,请稍后再试."),
	// ERROR_UNKNOWN(		501,"未知错误");

}
module.exports = Result;