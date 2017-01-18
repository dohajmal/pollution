mymodule.factory('user', function($http, $rootScope, $stateParams, $q) {


        var url = 'http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/';


        return {

            uploadPicture: function(picData, id) {
                //var deffered = $q.defer();
                try {


                    var fileURL = picData;
                    var options = new FileUploadOptions();
                    options.fileKey = "file";
                    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                    options.mimeType = "image/jpeg";
                    options.chunkedMode = false;

                    var params = {};
                    params.prenom = "ch";
                    options.params = params;

                    var ft = new FileTransfer();
                } catch (e) {
                    alert(e);
                }

                ft.upload(fileURL, encodeURI("http://192.168.1.109/webservice_ionic/upload.php"),
                    function success(res) {
                        var img = res.response.replace(/(?:\r\n|\r|\n)/g, "");
                        img = img.replace(/\ /g, "");
                        $rootScope.$emit('uploadfinished', img, id);
                        //  deffered.resolve(img);
                    },
                    function error(error) {
                        $rootScope.$emit('uploaderror', e); //deffered.reject(error);
                    }, options);

            },
            setProfile: function(data, num, tp) {


            },

            logout: function() {
                var deffered = $q.defer();
                $http.get(url + 'user/logout')
                    .success(function(data, status, headers, config) {
                        deffered.resolve(data);
                    }).error(function(data, status, headers, config) {
                       // alert("failed");
                        deffered.reject(status);
                    });

                return deffered.promise;
            }

        };
    })
    .factory('Reservation', function($http, $q) {


    })
    .factory('Markers', function($http, $q) {

        var url = "http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/";



        return {
            getMarkers: function(lat, lng) {

                var deffered = $q.defer();
                $http.get(url + 'user/nearestppl?lat=' + lat + '&lng=' + lng + '&rad=1500.2')
                    .success(function(data, status, headers, config) {

                        deffered.resolve(data);
                    }).error(function(data, status, headers, config) {
                        //alert("failed");
                        deffered.reject(status);
                    });

                return deffered.promise;
            },
            getMyUser: function(id) {

                var deffered = $q.defer();
                console.log("positionRider " + encodeURI(url + "user/rider/postion?num=" + id));
                $http.get(encodeURI(url + "user/rider/postion?num=" + id))
                    .success(function(data, status, headers, config) {
                        deffered.resolve(data);
                    }).error(function(data, status, headers, config) {
                       // alert("failed");
                        deffered.reject(status);
                    });

                return deffered.promise;
            },


            getNumber: function(num) {
                if (num) {
                    var ratings = [];

                    for (var i = 0; i < num; i++) {
                        ratings.push(i);
                    }

                    return ratings;

                }
            }

        }
    })
    .factory('sessionService', ['$http', function($http) {
        return {
            set: function(key, value) {
                return localStorage.setItem(key, JSON.stringify(value));
            },
            getNum: function() {
                try {
                    var x = JSON.parse(localStorage.getItem("riderrndm")).split(",");
                    return x[1];
                } catch (e) {
                    console.log(e);
                }
            },
            get: function(key) {
                return JSON.parse(localStorage.getItem(key));
            },
            destroy: function(key) {
                return localStorage.removeItem(key);
            },
        };
    }])
    .factory('country', function($http, $q) {
        return {
            getAll: function() {
                var deffered = $q.defer();
                $http({
                    method: 'GET',
                    url: './images/countries.json'
                }).success(function(data, status, headers, config) {
                    deffered.resolve(data);
                }).error(function(data, status, headers, config) {
                  //  alert("failed");
                    deffered.reject(status);
                });

                return deffered.promise;

            }
        }
    })
    .directive('select', function() {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                element.bind('focus', function(e) {
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        // console.log("show bar (hide = false)");
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                    }
                });
                element.bind('blur', function(e) {
                    if (window.cordova && window.cordova.plugins.Keyboard) {
                        // console.log("hide bar (hide = true)");
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                    }
                });
            }
        };
    })
    .directive('mhToggle', function($ionicGesture, $timeout) {

        return {
            restrict: 'E',
            replace: true,
            require: '?ngModel',
            transclude: true,
            template: '<div class="wrap">' +
                '<div ng-transclude></div>' +
                '<label class="toggle">' +
                '<input type="checkbox">' +
                '<div class="track">' +
                '<div class="handle"></div>' +
                '</div>' +
                '</label>' +
                '</div>',

            compile: function(element, attr) {
                var input = element.find('input');
                angular.forEach({
                    'name': attr.name,
                    'ng-value': attr.ngValue,
                    'ng-model': attr.ngModel,
                    'ng-checked': attr.ngChecked,
                    'ng-disabled': attr.ngDisabled,
                    'ng-true-value': 1,
                    'ng-false-value': 0,
                    'ng-change': attr.ngChange
                }, function(value, name) {
                    if (angular.isDefined(value)) {
                        input.attr(name, value);
                    }
                });


                if (attr.toggleClass) {
                    element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
                }

                return function($scope, $element, $attr) {
                    var el, checkbox, track, handle;

                    el = $element[0].getElementsByTagName('label')[0];
                    checkbox = el.children[0];
                    track = el.children[1];
                    handle = track.children[0];

                    var ngModelController = angular.element(checkbox).controller('ngModel');

                    $scope.toggle = new ionic.views.Toggle({
                        el: el,
                        track: track,
                        checkbox: checkbox,
                        handle: handle,
                        onChange: function() {
                            if (checkbox.checked) {
                                ngModelController.$setViewValue(true);
                            } else {
                                ngModelController.$setViewValue(false);
                            }
                            $scope.$apply();
                        }
                    });

                    $scope.$on('$destroy', function() {
                        $scope.toggle.destroy();
                    });
                };
            }

        };
    });