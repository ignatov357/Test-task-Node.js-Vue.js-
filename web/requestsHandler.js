if(typeof express === "undefined") {
    express = require('express');
}
if(typeof path === "undefined") {
    path = require('path');
}
if(typeof session === "undefined") {
    session = require('express-session');
}
if(typeof mysqlSessionStore === "undefined") {
    mysqlSessionStore = require('express-mysql-session');
}
sessionStore = new mysqlSessionStore({host: 'localhost', user: 'root', password: 'qpalzm', database: 'test_system'});

requestsHandler = express();
requestsHandler.use(session({secret: 'QpalzM2468', store: sessionStore, saveUninitialized: false, resave: false, rolling: true, cookie: {maxAge: 43200000, httpOnly: false}, name: 'session_id'}));
var uiRequestsRouter = require('./uiRequestsRouter');
var apiRequestsRouter = require('./apiRequestsRouter');
requestsHandler.use('/api/v1/', apiRequestsRouter);
requestsHandler.use('/', uiRequestsRouter);

module.exports = function(port = 80) {
	requestsHandler.listen(port);
}