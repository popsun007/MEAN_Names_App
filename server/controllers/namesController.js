// back-end controller
var mongoose = require('mongoose');
var Names = mongoose.model('names');
module.exports = (function(){
	return {
		show: function(req, res)
			{
				Names.find({}, function(err, data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						res.json(data);
					}
				})
			},
		show_individual: function(req,res)
			{
				var name = req.params.name.toLowerCase();
 				Names.find({name: new RegExp("^" + name, "i")}, function(err, data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						// String.prototype.capitalize = function() 
						// {
						//     return this.charAt(0).toUpperCase() + this.slice(1);
						// } // capitalize display name
						// console.log(data[0]);
						if(data[0] != undefined)
						{
							// data[0].name = data[0].name.capitalize()
							res.json(data);
						}
						else
						{
							res.json({error: "No such a name in our database!!!"})
						}
					}
				})

			},
		create_name: function(req, res)
			{
				var new_name = req.params.name.toLowerCase();
				var names = new Names({name: new_name});
				names.save(function(err, data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						res.json({log: "Successfully add a name to database!!!" });
					}
				})
			},
		remove_name: function(req, res)
			{
				var input_name = req.params.name.toLowerCase();
				Names.remove({name: input_name}, function(err, data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						res.json({log: "Successfully delete " + input_name + " from database!!!" });
					}
				})
			}
	}
})()