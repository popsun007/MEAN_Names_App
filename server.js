var express = require('express');
var path = require('path');
var bodyParser = require('body-Parser');

var app = express();

app.use(express.static(path.join(__dirname, './client')));
app.use(bodyParser.json());

require('./config/mongoose.js');
require('./config/routes.js')(app);

app.listen(8090, function() {
	console.log("1995 names app is on port 8090");
})