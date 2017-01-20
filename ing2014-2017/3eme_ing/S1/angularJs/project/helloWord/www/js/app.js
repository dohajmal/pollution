// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })
 .state('app.vibration', {
    url: '/vibration',
    views: {
      'menuContent': {
        templateUrl: 'templates/vibration.html',

      }
    }
  })
   .state('app.cards', {
      url: '/cards',
      views: {
        'menuContent': {
          templateUrl: 'templates/cards.html',

        }
      }
    })
      .state('app.home', {
                        url: '/home',
                        views: {
                        'menuContent': {
                         templateUrl: 'templates/home.html',
                           controller: 'homeController'

                                          }
                                        }
                                      })
          .state('app.news/:id', {
           url: '/news',
           views: {
          'menuContent': {
           templateUrl: 'templates/news.html',
           controller: 'newsController'

                                                                                }
                                                                              }
                                                                            })

       .state('app.shopping_card', {
          url: '/shopping_card',
          views: {
            'menuContent': {
              templateUrl: 'templates/shopping_card.html',

            }
          }
        })

               .state('app.scroll', {
                          url: '/scroll',
                          views: {
                            'menuContent': {
                              templateUrl: 'templates/sroll.html',

                            }
                          }
                        })


           .state('app.camera', {
              url: '/camera',
              views: {
                'menuContent': {
                  templateUrl: 'templates/camera.html',

                }
              }
            })


  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
