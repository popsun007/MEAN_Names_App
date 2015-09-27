//routes
var namesApp = angular.module("namesApp", ['ngRoute']);
namesApp.config(function($routeProvider)
{
	$routeProvider
	.when("/", {
		templateUrl: "partials/showNames.html"
	})
});


//factories
namesApp.factory("namesFactory", function($http)
{
	var factory = {};
	factory.getNames = function(callback)
		{
			$http.get('/show_names').success(function(output)
			{
				callback(output);
			})
		}
	factory.addName = function(newName, callback)
		{
			$http.get("/new/" + newName.name, newName).success(function(output)
			{
				// console.log(output);
				callback(output);
			})
		}
	factory.delete_name = function(id, callback)
		{
			$http.get("/remove/" + id).success(function(output)
			{
				callback(output);
			})
		}
	return factory;
})

//controllers
namesApp.controller("namesController", function($scope, namesFactory)
{
	namesFactory.getNames(function(data)
	{
		$scope.names = data;
	});
	$scope.createName = function()
		{
			// console.log($scope.newName.name);
			namesFactory.addName($scope.newName, function(data)
			{
				// console.log(data);
				$scope.names = data;
			})
			$scope.newName = {};
		}
	$scope.remove_by_id = function(id)
		{
			namesFactory.delete_name(id, function(new_data)
				{
					$scope.names = new_data;
				});
		}
})