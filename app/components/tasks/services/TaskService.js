(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("TaskService",
            TaskService);

    function TaskService() {
        var taskService = {};

        taskService.unfinishedTasks = unfinishedTasks;
        taskService.unfinishedTasksCount = unfinishedTasksCount;
        taskService.finishedTasks = finishedTasks;
        taskService.finishedTasksCount = finishedTasksCount;

        taskService.unfinishedTasksList = [{
                "id": 4,
                "title": "Code the menu",
                "description": "Set the menu options and references",
                "registrationDate": new Date("02/09/2017"),
                "deadline": new Date("02/11/2017"),
                "done": false,
            },
            {
                "id": 5,
                "title": "Finish the tasks list layout",
                "description": "The task list needs to be revised",
                "registrationDate": new Date("02/09/2017"),
                "deadline": new Date("02/15/2017"),
                "done": false,
            },
            {
                "id": 6,
                "title": "Finish the tasks list layout",
                "description": "The task list needs to be revised",
                "registrationDate": new Date("02/09/2017"),
                "done": false,
            },
            {
                "id": 7,
                "title": "Create the http request methods",
                "description": "Create the http requests to the api",
                "registrationDate": new Date("02/10/2017"),
                "deadline": new Date("02/19/2017"),
                "done": false,
            },
            {
                "id": 8,
                "title": "New task Form",
                "description": "Create the new task view and controller",
                "registrationDate": new Date("02/09/2017"),
                "deadline": new Date("02/25/2017"),
                "done": false,
            },
            
        ];

        taskService.finishedTasksList = [{
                "id": 1,
                "title": "Code the menu",
                "description": "Set the menu options and references",
                "registrationDate": new Date("02/09/2017"),
                "deadline": new Date("02/11/2017"),
                "done": true,
            },
            {
                "id": 2,
                "title": "Finish the tasks list layout",
                "description": "The task list needs to be revised",
                "registrationDate": new Date("02/09/2017"),
                "deadline": new Date("02/15/2017"),
                "done": true,
            },
            {
                "id": 3,
                "title": "Finish the tasks list layout",
                "description": "The task list needs to be revised",
                "registrationDate": new Date("02/09/2017"),
                "done": true,
            }
        ];

        function unfinishedTasks() {
            return taskService.unfinishedTasksList;
        }

        function finishedTasks() {
            return taskService.finishedTasksList;
        }

        function unfinishedTasksCount() {
            return taskService.unfinishedTasksList.length;
        }

        function finishedTasksCount() {
            return taskService.finishedTasksList.length;
        }

        return taskService;

    }
}());