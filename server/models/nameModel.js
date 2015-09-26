var mongoose = require('mongoose');
var names = new mongoose.Schema({
	name: String
});
names.path('name').required(true, "Name can not be empty!");

mongoose.model('names', names);