(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("TaskService",
            TaskService);

    function TaskService($resource) {

        //The API runs locally for now. 
        var apiUrl = 'http://localhost:4000/tasks';
        var resource = $resource(apiUrl);;
        return {
            unfinishedTasks: $resource(apiUrl, {}, {
                query: {
                    method: 'GET',
                    params: {
                        finished: false
                    },
                    isArray: true
                }
            }),
            finishedTasks: $resource(apiUrl, {}, {
                query: {
                    method: 'GET',
                    params: {
                        finished: true
                    },
                    isArray: true
                }
            }),
            save: function (taskDto) {
                return resource.save(taskDto);
            },
            finish: function (id) {
                console.log('Finishing the task...')
                return $resource(apiUrl + '/:id/finish', {
                    id: '@id'
                }, {
                    'finish': {
                        method: 'PUT',
                        params: {
                            id: "@id"
                        }
                    }
                });
            },
            delete: function (id) {
                return particularResource.delete();
            }
        }
    }

}());