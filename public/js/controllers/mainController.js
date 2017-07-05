angular.module('mainController',[])
	.controller('mainCtrl',function ($scope,db) {
		db.getData().then(function (result) {
			$scope.accounts = result.data;
		})
	})