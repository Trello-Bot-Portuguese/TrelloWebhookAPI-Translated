/*
 This file is part of Turquoise.
 Copyright © Snazzah ??? - 2019
 Copyright © Yamboy1 (and contributors) 2019
 Copyright © Lobo Metalurgico 2019
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

'use strict';
var moment = require("moment");
var fs = require("fs");
var cors = require("cors");
var config = require("./config.json")

var express = require('express');
var app = express();
var http = require('http').Server(app);

var chalk = require("chalk");
var RateLimit = require('express-rate-limit');
var client = require('redis').createClient(config.redis);

var limitr = require('express-limiter')(app, client);
let bodyParser = require('body-parser');

// App Settings \\

app.set("json spaces", 4);

// Ratelimit \\

let buildLimit = function(path, method){
	return {
		path: path,
		method: method,
  	lookup: 'connection.remoteAddress',
		skipHeaders: true,
		total: 25,
		expire: 1*60*1000,
		onRateLimited: function(req, res, next){
			res.status(429).json({status: 429, error: "Too many requests, please try again later."});
		}
	};
};

//limitr(buildLimit('/trello*', 'get'));


var log = function(level, message){

	var lg = "["+moment().format()+"] "+message;
	switch(Number(level)){
		case 1:
			console.log(chalk.green(lg));
		break;
		case 2:
			console.log(chalk.yellow(lg));
		break;
		case 3:
			console.log(chalk.red(lg));
		break;
	}

};

app.use(bodyParser.json());
app.use(cors());

app.use(require('./middleware/error.js'));

app.use('/trello', require('./router/trello.js'));
app.use('/trellobeta', require('./router/trellobeta.js'));

// Non-Ratelimited endpoints \\

http.listen(config.recv_port, function(){
	console.log(chalk.green(`recebendo de *:${config.recv_port} (ip:porta)`));
});
