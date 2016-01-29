var listApp = angular.module('listApp', ['ngRoute']);

// need <base> tag for html5 mode
angular.element(document.getElementsByTagName('head'))
  .append(angular.element('<base href="' + window.location.pathname + '"/>'));

listApp.config(['$routeProvider', '$locationProvider', 
    function($routeProvider, $locationProvider, $httpProvider){

      $routeProvider.
       when('/add', {
        templateUrl: 'partials/add.html',
        controller: 'addCtrl'
        }).
        when('/list', {
          templateUrl: 'partials/list.html',
          controller: 'listCtrl'
        }).
        when('/read', {
          templateUrl: 'partials/read.html',
          controller: 'readCtrl'
        }).
        when('/update', {
          templateUrl: 'partials/update.html',
          controller: 'updateCtrl'
        }).
        when('/delete', {
          templateUrl: 'partials/delete.html',
          controller: 'deleteCtrl'
        }).
        otherwise({
          templateUrl: 'partials/other.html',
          controller: 'otherCtrl'
        });

        $locationProvider.html5Mode(true);
    }
]);


//listApp.service('submitService', function(){
//  var submitData = {};
//  var setData = function(newData){
//    submitData = newData;
//  };
//  var getData = function(){
//    return submitData;
//  };
//  return {
//    setData: setData,
//    getData: getData
//  };
//});

//listApp.value('clientId', 'foobar');
//listApp.value('submitData', 'foobar');
listApp.service('submitEntry', function(){
  var entry = { id:'9999'};

  return {
    getProperty: function(){
      return entry;
    },
    setProperty: function(value){
      entry = value;
    }
  };
});

listApp.controller('listCtrl', ['$scope', '$http', '$routeParams', 'submitEntry',
    function($scope, $http, $routeParams, submitEntry){
  $scope.sortType = 'id';
  $scope.sortReverse = false;
  $scope.searchFish = '';
  console.log("value recipe" + submitEntry);
  console.log(submitEntry);

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

  $scope.submitData = function(data){
    console.log(submitEntry);
    //submitService.setData(data);
    $scope.id             = data.id            ; 
    $scope.team           = data.team          ; 
    $scope.fullname       = data.fullname      ; 
    $scope.christian_name = data.christian_name; 
    $scope.birthday       = data.birthday      ; 
    $scope.telephone      = data.telephone     ; 
    $scope.postcode       = data.postcode      ; 
    $scope.address        = data.address       ; 


    console.log(submitEntry.setProperty(data));
    console.log(submitEntry.getProperty());
  };

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
}])
.controller('updateCtrl', ['$scope', function($scope, $http){

  $scope.sortType = 'id';
  $scope.sortReverse = false;
  $scope.searchFish = '';

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



}]).controller('submitCtrl', function($scope, $http, submitEntry){
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
}).controller('addCtrl', function($scope, $http){
  $scope.data = "Add Controller";
})
.controller('deleteCtrl', function($scope, $http){
  $scope.data = [
    "foo", "bar", "baz"
  ];
})
.controller('otherCtrl', function($scope, $http){
  $scope.data = [ "foo", "bar", "baz" ];
  $scope.name = "Others";
});
