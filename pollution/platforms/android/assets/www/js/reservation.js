mymodule.controller('mapCtrl', function($scope, $rootScope, Markers, $interval, $state, $stateParams, sessionService, $ionicPopup, $http) {
        var timer = null;
        var riderPromise;
        $scope.data = {};
        try {
            $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
                // viewData.enableBack = false;
                // $scope.doRefresh();
            });
            $scope.$on('$ionicView.beforeLeave', function(event, viewData) {
                $interval.cancel(timer);
                $scope.map.clear();
                $scope.map.off();
                // $scope.doRefresh();
            });
            $scope.$on('$ionicView.enter', function() {
                //  $rootScope.side_menu.style.visibility = "hidden";
                $scope.data = $stateParams;
                $scope.initMap();
            });
            var posOptions = {
                timeout: 10000,
                enableHighAccuracy: true
            };
            $scope.initMap = function() {
                try {
                    $scope.data = $stateParams;
                    var div = document.getElementById("map");
                    if (!$scope.map)
                        $scope.map = plugin.google.maps.Map.getMap(div);
                    $scope.map.clear();
                    $scope.map.setDiv(div);
                    $scope.map.refreshLayout();
                    navigator.geolocation.getCurrentPosition(getPosReady, function(err) {
                        alert("Cant get position");
                        //getPosReady(new plugin.google.maps.LatLng(17.422858, -12.085065));
                    }, posOptions);
                    timer = $interval(function() {
                        navigator.geolocation.watchPosition(
                            function(position) {
                                setMarkerPosition(position);
                            },
                            function(err) {
                                alert("Cant get position");
                            }, {
                                maximumAge: 600000,
                                timeout: 15000,
                                enableHighAccuracy: true
                            });
                    }, 5000);
                } catch (e) {
                   // alert(e+"1");
                }
            }
            function setMarkerPosition(pos) {
                $scope.myPosition = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                };
                $scope.map.setCenter(new plugin.google.maps.LatLng(
                    pos.coords.latitude,
                    pos.coords.longitude
                ));
                if ($scope.Mymarker)
                    $scope.Mymarker.position = new plugin.google.maps.LatLng(
                        pos.coords.latitude,
                        pos.coords.longitude
                    );
                else {
                    $scope.map.addMarker({
                        'position': new plugin.google.maps.LatLng(
                            pos.coords.latitude,
                            pos.coords.longitude
                        ),
                        'icon': {
                            'url': 'www/img/icone-scooter.png'
                        }
                    }, function(marker) {
                        $scope.Mymarker = marker;
                    });
                }
                riderPromise = Markers.getMyUser($scope.data.tel);
                riderPromise.then(function(response) {
                    $scope.getDist($scope.myPosition, response);
                    if ($scope.riderMarker)
                        $scope.riderMarker.position = new plugin.google.maps.LatLng(
                            response.lat,
                            response.longg
                        );
                    else $scope.map.addMarker({
                        'position': new plugin.google.maps.LatLng(response.lat, response.longg)
                    }, function(marker) {
                        $scope.riderMarker = marker;
                    });
                });
            }
                /* function createMarkers() {
                        $http.get('http://10.0.3.2/projet/map.php')
                              .success(function(data) {
                              alert( data );
                              var json =data;
                              for (var i = 0, length = json.length; i < length; i++) {
                                var data = json[i],
                                    latLng = new google.maps.LatLng(data.latitude, data.longitude);
                                // Creating a marker and putting it on the map
                                var marker = new google.maps.Marker({
                                  position: latLng,
                                  map: map,
                                  title: "hhhhhh",
                                  'icon': {
                                   'url': 'www/img/polu.png'
                                    }
                                });
                              }
                              });
                              }*/
            function getPosReady(position) {
                try {
                    $scope.myPosition = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    $scope.map.setCenter(new plugin.google.maps.LatLng(
                        position.coords.latitude,
                        position.coords.longitude
                    ));
                    $scope.map.animateCamera({
                        target: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        zoom: 3,
                        tilt: 10,
                        bearing: 10,
                        duration: 3000
                    }, function() {
                        var markerSizeScale = 5;
                        var markerSize = {
                            width: parseInt(37 * markerSizeScale),
                            height: parseInt(52 * markerSizeScale)
                        };
                      /*   $scope.map.addMarker({
                          position: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                            title: "Je suis là \n" +
                                "",
                            'icon': {
                                'url': 'www/img/pos.png'
                            }
                        }, function(marker) {
                            $scope.Mymarker = marker;
                            marker.setDraggable(false);
                            marker.on(plugin.google.maps.event.INFO_CLICK, function() {});
                        });*/
                        $scope.refresh=function(){
                        alert("ok");

                        $http.get('http://192.168.1.109/webservice_ionic/map.php')
                        .success(function(data) {
                         alert(data[0].latitude);
                         for(i=0;i<data.length;i++){

                                         $scope.map.addMarker({


                                                     position: new plugin.google.maps.LatLng(data[i].latitude, data[i].longitude)
,
                                                 'icon': {
                                                         'url': 'www/img/polu.png'
                                                     }


                                                 }
                                                    , function(marker) {
                                                     $scope.Mymarker = marker;
                                                     marker.setDraggable(false);


                                                     marker.on(plugin.google.maps.event.INFO_CLICK, function() {});

                                                 });

                                                 }
                         console.log("hhhhhhhhhhhhh"+data);
                                   }).error(function(data) {
                                    alert(data );
                        console.log('errrrrror map: ' + data);
                                              });
}
                    });
                } catch (e) {
                   // alert(e+"2");
                }
            }
            var directionsDisplay, directionsService;
            $scope.getDist = function(source, arriv) {
                directionsService = new google.maps.DirectionsService();
                /* directionsDisplay = new google.maps.DirectionsRenderer({
                                                                        'draggable': true
                                                                        });*/
                try {
                    /*plugin.google.maps.external.launchNavigation({
                      "from": new google.maps.LatLng(source.lat,source.lng),
                      "to": new google.maps.LatLng(arriv.lat,arriv.longg)
                    });*/
                    var request = {
                        origin: new google.maps.LatLng(source.lat, source.lng),
                        destination: new google.maps.LatLng(arriv.lat, arriv.longg),
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    directionsService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            // directionsDisplay.setDirections(response);
                            //directionsDisplay.setMap($scope.map);
                        }
                    });
                    //*********DISTANCE AND DURATION**********************//
                    var service = new google.maps.DistanceMatrixService();
                    service.getDistanceMatrix({
                        origins: [request.origin],
                        destinations: [request.destination],
                        travelMode: google.maps.TravelMode.DRIVING,
                        unitSystem: google.maps.UnitSystem.METRIC,
                        avoidHighways: false,
                        avoidTolls: false
                    }, function(response, status) {
                        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                            var distance = response.rows[0].elements[0].distance.text;
                            var duration = response.rows[0].elements[0].duration.text;
                            var durationMin = response.rows[0].elements[0].duration.value;
                            durationMin = Math.round(parseInt((parseInt(durationMin) * 0.7)));
                            var hours = parseInt(durationMin / 3600) % 24;
                            var minutes = parseInt(durationMin / 60) % 60;
                            var resultTime;
                            if (hours == 0) resultTime = minutes + " mins";
                            else resultTime = hours + " hours " + minutes + " mins";
                            $scope.$apply(function() {
                                $scope.data.distance = " " + distance;
                                $scope.data.time = " " + resultTime;
                                $scope.data.time2 = " " + duration;
                            });
                        } else {
                            console.log("Unable to find the distance via road.");
                        }
                    }); // $timeout(function(){if(!$scope.data.dist){$scope.getDist();} },1000);
                } catch (e) {
                  //  alert(e+"3");
                }
            }
            $scope.typeC = $stateParams.tel + 0;
            $scope.tel = $stateParams.tel;
            $scope.photo = $stateParams.photo;
        } catch (e) {
           // alert(e+"4");
        }
    })
    .controller('avis2Ctrl', function($scope, $interval, $state, Reservation, $stateParams, sessionService, $ionicPopup, $http) {
        $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
            viewData.enableBack = false;
            // $scope.doRefresh();
        });
        $scope.data = [0, 0, 0, 0, 0];
        $scope.myTitle = 'Ajouter votre avis';
        $scope.ratingsObject = {
            iconOn: 'ion-ios-star', //Optional
            iconOff: 'ion-ios-star-outline', //Optional
            iconOnColor: 'rgb(255,177,0)', //Optional
            iconOffColor: 'rgb(200, 100, 100)', //Optional
            rating: 0, //Optional
            minRating: 0, //Optional
            readOnly: false, //Optional
            callback: function(rating, index) { //Mandatory
                $scope.ratingsCallback(rating, index);
            }
        };
        $scope.ratingsCallback = function(rating, index) {
            alert('Selected rating is : ' + rating + ' and index is ' + index);
            $scope.data[index] = rating;
        };
    });