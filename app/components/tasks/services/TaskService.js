(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("TaskService",
            TaskService);

    function TaskService($http, $resource) {

        //The API runs locally for now. 
        var apiUrl = 'http://localhost:4000/tasks';
        var resource = $resource(apiUrl);;
        return {
            unfinishedTasks: function () {
                return $http.get(apiUrl, {
                    params: {
                        "finished": false
                    }
                });

            },
            finishedTasks: function () {
                return $http.get(apiUrl, {
                    params: {
                        "finished": true
                    }
                });
            },
            save: function (taskDto) {
                return $http.post(apiUrl,taskDto);
            },
            finish: function (id) {
                return $http.put(apiUrl + '/' + id + '/finish', null);
            },
            delete: function (id) {
                return $http.delete(apiUrl + '/' + id);
            }
        }
    }

}());