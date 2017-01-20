angular.module('starter.services', [])

.factory('Chats', function() {

  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('news', function($http,$q) {
          return { getAll : function (select) {
        var deffered = $q.defer();
		var url="https://newsapi.org/v1/articles?source="+select+"&sortBy=top&apiKey=1b9d6c31860442de8401d10394255149"
        $http({
          method: 'GET',
          url: url
        }).success(function (data, status, headers, config) {
          deffered.resolve(data);
        }).error(function (data, status, headers, config) {
          alert("failed"); deffered.reject(status);
        });

        return deffered.promise;

      }
  }}
                           );
