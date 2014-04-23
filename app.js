var express = require('express');
var log4js = require('log4js');
var routes = require('./routes');
var app = express();

// log
log4js.configure({
    appenders: [{type: 'console'},
                {type: 'file', filename: 'logs/reider_log.log', category: 'dev'}]
});
var logger = log4js.getLogger('dev');
logger.setLevel('DEBUG');
app.use(log4js.connectLogger(logger, {level: log4js.levels.DEBUG}));

// routes
routes(app);

// server
var serverr = app.listen(3000, function(){
	console.log('The server is listening on port %d ...', serverr.address().port);
});


module.exports = app;