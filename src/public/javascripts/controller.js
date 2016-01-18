var listApp = angular.module('listApp', ['ui.bootstrap']);

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
    $scope.setEntry = function(entry){
        $scope.filledEntry = entry;
        console.log("clicked");
        //console.log( entry );
        console.log( "$scope.filledEntry = " + $scope.filledEntry );
        console.log( $scope.filledEntry );

    };
    $scope.submit = function(){
        var send_command = [
          $scope.filledEntry.id,
          $scope.filledEntry.team,
          $scope.filledEntry.fullname,
          $scope.filledEntry.christian_name,
          $scope.filledEntry.birthday,
          $scope.filledEntry.telephone, 
          $scope.filledEntry.postcode,
          $scope.filledEntry.address
        ].join('/');

        console.log("entry: " + $scope.filledEntry);
        console.log("pushed: " + send_command);
        $http.get('/insert/' + send_command).success(function(data){
            $scope.list= data;
            console.log(data);
        }).error(function(){
            $scope.list = [
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
}).controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

      $scope.animationsEnabled = true;

        $scope.open = function (size) {

              var modalInstance = $uibModal.open({
                      animation: $scope.animationsEnabled,
                        templateUrl: 'myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        size: size,
                        resolve: {
                                  items: function () {
                                              return $scope.items;
                                                      }
                                               }
                  });

                  modalInstance.result.then(function (selectedItem) {
                          $scope.selected = selectedItem;
                              }, function () {
                                      $log.info('Modal dismissed at: ' + new Date());
                                          });
                    };

          $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
                  };

}).controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

