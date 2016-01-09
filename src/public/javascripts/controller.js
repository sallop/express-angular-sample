var listApp = angular.module('listApp', []);

listApp.controller('listCtrl', function($scope, $http){
	$scope.click = function(n){
		$scope.count = n;
		console.log("pushed");
		$http.get('/list/' + $scope.count ).success(function(data){
			$scope.entries = data;
			console.log(data);
		})
		.error(function(){
			$scope.entries = [
				{'id':0, 'team':0, 'fullname':'error occured'}
			];
		});
	};
}).controller('createCtrl', ['$scope', function($scope, $http){
	$scope.userType = 'guest';
}]).controller('submitCtrl', function($scope, $http){
	$scope.list = [];
	$scope.text = 'hello';

	$scope.id = '404';
	$scope.team = '4';
	$scope.fullname = 'John Smith';
	$scope.christian_name = 'St.Expedite';
	$scope.birthday = '1987-07-07';
	$scope.telephone = '00000000';
	$scope.postcode = '00000000';
	$scope.address = 'Blackheath Ave, London SE10 8XJ, United Kingdom';

	$scope.submit = function(){
		var send_command = [
			$scope.id,
			$scope.team,
			$scope.fullname,
			$scope.christian_name,
			$scope.birthday,
			$scope.telephone, 
			$scope.postcode,
			$scope.address
		].join('/');

		console.log("pushed: " + send_command);
		$http.get('/insert/' + send_command).success(function(data){
			$scope.list= data;
			console.log(data);
		})
		.error(function(){
			$scope.list = [
				{'id':0, 'team':0, 'fullname':'error occured'}
			];
		});
	};
}).controller('readCtrl', function($scope, $http){
	$scope.read = function(){
		var send_command = [
			$scope.id,
			$scope.team,
			$scope.fullname,
			$scope.christian_name,
			$scope.birthday,
			$scope.telephone, 
			$scope.postcode,
			$scope.address
		].join('/');
		
		$http.get('/read/' + send_command).success(function(data){
			$scope.list = data;
			console.log(data);
		})
		.error(function(){
			console.log("error occured");
		});
	};
});
