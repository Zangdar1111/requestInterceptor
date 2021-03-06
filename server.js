/* server.js
 * =========
 * Main module of the server
 */

//get npm or node dependancies
var express = require('express');
var bodyParser = require('body-parser');

//init server properties and connections, then init http server
console.log("Starting initialization of Request Interceptor");

var app = express();
var port = process.env.PORT || 80;

//Body parser middleware
app.use(bodyParser.json());

var lastReq = [];

//Main route and Slack Register route
app.all('/register',function(req, res) {
	lastReq.push(req.body);
	console.log("saved "+lastReq.length);
	console.log(req);
	res.status(200).send("[accepted]");
});

app.all('/show',function(req, res) {
	res.status(200).send(lastReq);
});

app.all('/flush',function(req, res) {
	lastReq = [];
	console.log("flush");
	res.status(200).send("flushed");
});

//Error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Request Interceptor is now listening on port '+port+'.');
});
