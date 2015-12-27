/// <reference path="typings/node/node.d.ts"/>

var http = require("http");
var cookies = require("cookies");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

//Add cookie support as a middleware layer
app.use(cookies.express());

//Setup the view engine
app.set("view engine", "vash");

/// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//Set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Setup the schedule
var schedule = require("./lib/schedule");
schedule.init();

//Setup the filters
var filters = require("./filters");
filters.init(app);

//Setup the routes
var controllers = require("./controllers");
controllers.init(app);

//Create the server
var server = http.createServer(app);

//Start listening
server.listen(process.env.PORT || 3000); 
