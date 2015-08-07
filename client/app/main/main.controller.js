'use strict';

function errorHandler () {
  console.log('Not cool bro');
}

angular.module('rentshakStageApp')
  .controller('MainCtrl', function ($scope, $http, Backand) {

    var main = this;

    main.username = '';
    main.password = '';

    // $http.get('/api/things').success(function(awesomeThings) {
    //   main.awesomeThings = awesomeThings;
    // });

    // main.addThing = function() {
    //   if(main.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: main.newThing });
    //   main.newThing = '';
    // };

    // main.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    main.signIn = function() {
      Backand.signin(main.username, main.password)
      .then(
        function (response) {
          //Do good for the world
          console.log(response);
          main.loadObjects();
        },
        function (data, status, headers, config) {
          //handle error
          $log.debug("authentication error", data, status, headers, config);
          main.results = data;
        }
      );
    };

    main.getList = function(name, sort, filter) {
      return $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/objects/' + name,
        params: {
          filter: filter || '',
          sort: sort || ''
        }
      });
    };

    main.loadObjects = function () {
      $http({
        method: 'GET',
        url: Backand.getApiUrl() + '/1/table/config',
        params: {
          pageSize: 200,
          pageNumber: 1,
          filter: '[{fieldName:"SystemView", operator:"equals", value: false}]',
          sort: '[{fieldName:"captionText", order:"asc"}]'
        }
      }).then(loadObjectsSuccess, errorHandler);
    };

    function loadObjectsSuccess (list) {
      main.objects = list.data.data;
      main.results = "Objects loaded";
      main.isLoggedIn = true;
    };

  });
