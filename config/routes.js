var nameController = require('./../server/controllers/namesController.js');
module.exports = function(app)
	{
		app.get('/show_names', function(req, res)
		{
			nameController.show(req, res);
		});
		app.get('/:name', function(req, res)
		{
			nameController.show_individual(req, res);
		});
		app.get('/new/:name', function(req, res)
		{
			nameController.create_name(req, res);
		});
		app.get('/remove/:id', function(req, res)
		{
			nameController.remove_name(req, res);
		})
	}