(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("TaskService",
            TaskService);

    function TaskService($resource) {
       
       var apiUrl = 'http://localhost:4000/tasks';
       
       return {
           unfinishedTasks : $resource(apiUrl, {}, {
               query : {method: 'GET', params: {}, isArray : true}
           }),
           finishedTasks : $resource(apiUrl, {}, {
               query : {method: 'GET', params: {}, isArray : true}
           })
       } 
    }

/*
  angular.module('myApp.services', ['ngResource']).
  factory("geoProvider", function($resource) {
    return {
      states: $resource('../data/states.json', {}, {
        query: { method: 'GET', params: {}, isArray: false }
      }),
      countries: $resource('../data/countries.json', {}, {
        query: { method: 'GET', params: {}, isArray: false }
      })
    };
  });
*/


}());