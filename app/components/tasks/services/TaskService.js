(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("TaskService",
            TaskService);

    function TaskService($http) {

        //The API runs locally for now. 
        var apiHealthCheckUri = 'http://localhost:4000/ping';
        var apiUrl = 'http://localhost:4000/tasks';

        return {

            ping: function () {
                return $http.get(apiHealthCheckUri);
            },
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

            get: function (id) {
                return $http.get(apiUrl + '/' + id);
            },

            create: function (taskDto) {
                return $http.post(apiUrl, taskDto);
            },

            save: function (task) {
                var taskForUpdate = prepareTaskForUpdate(task);
                return $http.put(apiUrl + '/' + taskForUpdate.id, taskForUpdate);
            },
            finish: function (id) {
                return $http.put(apiUrl + '/' + id + '/finish', null);
            },
            delete: function (id) {
                return $http.delete(apiUrl + '/' + id);
            }
        }

        function prepareTaskForUpdate(task) {
            var taskForUpdate = {}
            taskForUpdate.id = task.id;
            taskForUpdate.title = task.title;
            taskForUpdate.deadline = task.deadline;
            taskForUpdate.description = task.description;
            taskForUpdate.comments = task.comments;
            taskForUpdate.priority = task.priority;

            return taskForUpdate;

        }
    }

}());