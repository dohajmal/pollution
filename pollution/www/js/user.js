mymodule.controller('cameraCtrl', function($scope, $rootScope, $ionicPopup, $rootScope, $ionicLoading, user, sessionService, $state) {
    try {
        $scope.data = {};
        $scope.data.ftLoad = [false, false, false, false, false, false];
        $scope.data.disable = true;
        $scope.showing = [true, true, true, true, true, true];
        $scope.data.picname = new Array('6');;
        $scope.data.picData = new Array('6');;

        try {
            var x = sessionService.get("riderrndm").split(",");
            $scope.data.num = x[1];
            $scope.handleStripe = function(status, response) {
                if (response.error) {
                    // there was an error. Fix it.
                } else {
                    // got stripe token, now charge it or smt
                    token = response.id
                }
            }
        } catch (e) {
            console.log(e);
        }
        $scope.data.master = "visa";
        $scope.showSelectValue = function(mySelect) {
            $scope.data.master = mySelect;
        }
        $scope.showConfirm = function(id) {
            $scope.id = id;
            var confirmPopup = $ionicPopup.confirm({
                title: 'Mode de chargement',
                template: 'Prendre une photo?',
                scope: $scope,
                buttons: [{
                    text: 'Camera',
                    type: 'button-assertive',
                    onTap: function() {
                        $scope.takePicture()
                    }
                }]

            });

        };


        // $scope.data.picData="img/moto-1.jpg";
        //$scope.data.ftLoad = true;
        $scope.takePicture = function() {
            var options = {
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA
            };
            navigator.camera.getPicture(
                function(imageData) {
                    $scope.data.picData[$scope.id] = imageData;
                    imageData = "";

                    uploadPicture($scope.id);
                    $scope.data.ftLoad[$scope.id] = true;
                    navigator.camera.cleanup(function() {}, function(e) {
                        console.log("fail cleaning");
                    });
                },
                function(err) {
                    $ionicLoading.show({
                        template: 'Erreur ...',
                        duration: 500
                    });
                }, options);
        }

        $scope.selectPicture = function() {

            var options = {
                quality: 40,
                destinationType: Camera.DestinationType.FILE_URI,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            };


            navigator.camera.getPicture(
                function(imageData) {
                    $scope.data.picData[$scope.id] = imageData;
                    imageData = "";
                    uploadPicture($scope.id);
                    $scope.data.ftLoad[$scope.id] = true;


                },
                function(err) {
                    $ionicLoading.show({
                        template: 'Erreur ...',
                        duration: 500
                    });
                }, options);
        };


        $rootScope.$on('uploadfinished', function(e, data, id) {
            //rÃ©ponse du serveur alert('reponse '+data);
            alert('uploadfinished ' + data);
            //alert(data);
            $scope.$apply(function() {
                $scope.showing[id] = true;
                $scope.data.disable = false;
                $scope.data.image =data;
            });
            data = data.replace(/\n/g, '');
            data = data.replace(/ /g, '');
            $scope.data.picname[id] = data; //nom de l image sur serveur
        });
        $rootScope.$on('uploaderror', function() {
            alert("error upload");
        });

        function uploadPicture(id) {

            $scope.$apply(function() {
                $scope.showing[id] = false;
                $scope.data.disable = true;
            });
            user.uploadPicture($scope.data.picData[id], id);

            /*var uploadPromise=user.uploadPicture($scope.data.picData[id]);
            uploadPromise.then(function(response){

                                                                     $scope.showing[id]= true;  $scope.data.disable=false;

                                                                $scope.data.picname[id]=response;

                                                                },  function(error){$ionicLoading.show({template: 'erreur de connection...'});$scope.showing[id]= true;});*/
        }

        $scope.send = function() {

            $ionicLoading.show({
                template: 'Uploading...',
                duration: 500
            });
            alert($scope.data.num);
            var inscri2Promise = user.setProfile($scope.data, $scope.data.num, 0);
            inscri2Promise.then(function(response) {
                if (response.done) {
                    navigator.notification.alert("Merci pour votre inscription , nous activerons votre compte apres validation", function() {}, "Alerte", "ok");
                    sessionService.set("riderrndm", "OK" + "," + $scope.data.num);
                    sessionService.set("riderstate", 'app.actif');
                    sessionService.set("riderpic", $scope.data.picname);
                    $rootScope.photo = $scope.data.picname;
                    $state.go('app.login');
                }
            }, function(error) {
                alert("error " + JSON.stringify(error));
            });


        }
    } catch (e) {
        alert(e);
    }
})