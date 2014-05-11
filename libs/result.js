var Result = {

    SUCCESS: {
        type: 200,
        message: "Success",
        data: "",
        build: function (data, message){
            return Result.build(this, data, message);
        }
    },
    FAIL: {
        type: 300,
        message: "Fail",
        data: "",
        build: function (data, message){
            return Result.build(this, data, message);
        }
    },
    ERROR_PARAMS: {
        type: 400,
        message: "Params is error",
        data: "",
        build: function (data, message){
            return Result.build(this, data, message);
        }
    },
    ERROR_RESULT: {
        type: 401,
        message: "Result params error.",
        data: "",
        build: function (data, message){
            return Result.build(this, data, message);
        }
    },
    ERROR_NO_RESULT: {
        type: 403,
        message: "nil",
        data: "",
        build: function (data, message){
            return Result.build(this, data, message);
        }
    },
    ERROR_SESSION:{
        type: 406,
        message: "未登录",
        data: "",
        build: function (data, message){
            return Result.build(this, data, message);
        }
    },
    ERROR_INVOKE:{
        type: 500,
        message: "系统错误,请稍后再试.",
        data: "",
        build: function (data, message){
            return Result.build(this, data, message);
        }
    },

    build: function(_type, _data, _message) {
        var result = {type: _type.type, message: _type.message, data: _type.data};
        if(!!_message){
            result.message = _message;
        }
        if(!!_data){
            result.data = _data;
        }
        return result;
    }

};

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

module.exports = Result;