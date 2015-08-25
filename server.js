/// <reference path="typings/node/node.d.ts"/>

var http = require("http");
var express = require("express");
var bodyParser = require('body-parser');
var app = express();

var controllers = require("./controllers");

//Setup the view engine
app.set("view engine", "vash");

/// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//Set the public static resource folder
app.use(express.static(__dirname + "/public"));

//Setup the routes
controllers.init(app);

//Create the server
var server = http.createServer(app);

//Start listening
server.listen(process.env.PORT || 3000); 
