angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('homeController', function($scope,$state) {
	$scope.goToNews=function(selec){
   // $state.go("app.browse",{:selec});
 $state.go('app.news', {selec: selec});
       }

	$scope.message = "hello";
})

.controller('newsController', function($scope,$stateParams,news) {
 $scope.date29 = new Date('2016/11/08');

 $scope.filterExpression = function(dt,chk) {
  if(!chk)
	  return true
  else
   return ($scope.date29<new Date(dt));
}
 $scope.news=[];
 var newsPromise =  news.getAll($stateParams.id);
newsPromise.then(function(response){$scope.news=response.articles;},function(error){alert(error);});

})
.controller('vibctrl',function($scope,$ionicPlatform){
$scope.vibrate=function(){
 navigator.vibrate(3000);}
})


.controller('ShoppingCtrl', function($scope, $ionicLoading) {
    $scope.invoice = {
        items: [{
            qty: 10,
            description: 'item',
            cost: 9.95}]
    };

    $scope.addItem = function() {
        $scope.invoice.items.push({
            qty: 1,
            description: '',
            cost: 0
        });
    },

    $scope.removeItem = function(index) {
        $scope.invoice.items.splice(index, 1);
    },

    $scope.total = function() {
        var total = 0;
        angular.forEach($scope.invoice.items, function(item) {
            total += item.qty * item.cost;
        })

        return total;
    }
})

.controller('SearchCtrl', function($scope, $ionicLoading) {

   $scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
   };

   $scope.hideLoading = function(){
      $ionicLoading.hide();
   };
})

.controller('CameraCtrl',function($scope){
$scope.pictureURl="";
$scope.takePicture = function(){
navigator.camera.getPicture(onSuccess, onFail, { quality: 25,
    destinationType: Camera.DestinationType.DATA_URL
});
}

function onSuccess(imageData) {

   $scope.pictureURl = "data:img/jpeg;base64," + imageData;
}
})



.controller('PlaylistCtrl', function($scope, $stateParams) {
});
