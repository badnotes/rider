var express = require('express');
var app = express();
var routes = require('./routes');


routes(app);

var serverr = app.listen(3000, function(){
	console.log('The server is listening on port %d ...', serverr.address().port);
});

module.exports = app;