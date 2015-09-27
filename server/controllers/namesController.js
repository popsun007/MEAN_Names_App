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
				String.prototype.capitalize = function() 
				{
				    return this.charAt(0).toUpperCase() + this.slice(1);
				} // capitalize method
				new_name = new_name.split(' ');
				for(var idx=0; idx<new_name.length; idx++)
				{
					if(new_name[idx] != '')
					{
						new_name[idx] = new_name[idx].capitalize();
					}
				}
				new_name = new_name.join(' ');
				//capitalize name then insert to database
				var names = new Names({name: new_name});
				names.save(function(err, data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						res.redirect("/show_names");
					}
				})
			},
		remove_name: function(req, res)
			{
				console.log(req.params.id);
				var name_id = req.params.id.toLowerCase();
				Names.remove({_id: name_id}, function(err, data)
				{
					if(err)
					{
						console.log(err);
					}
					else
					{
						res.redirect('/show_names');
					}
				})
			}
	}
})()