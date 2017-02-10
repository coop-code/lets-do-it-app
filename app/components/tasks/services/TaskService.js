(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("TaskService",
            TaskService);

    function TaskService() {
        var ts = {};

        ts.unfinishedTasks = unfinishedTasks;
        ts.unfinishedTasksCount = unfinishedTasksCount;
        ts.finishedTasks = finishedTasks;
        ts.finishedTasksCount = finishedTasksCount;

        ts.unfinishedTasksList = [{
                "id": 4,
                "title": "Code the menu",
                "description": "Set the menu options and references",
                "registrationDate": new Date("02/09/2017"),
                "deadline": new Date("02/11/2018"),
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

        ts.finishedTasksList = [{
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
            var tasks = ts.unfinishedTasksList;

            tasks.forEach(function (task) {
                calculateDeadlineInDays(task);
            });

            return tasks;
        }

        function finishedTasks() {
            return ts.finishedTasksList;
        }

        function unfinishedTasksCount() {
            return ts.unfinishedTasksList.length;
        }

        function finishedTasksCount() {
            return ts.finishedTasksList.length;
        }

        function calculateDeadlineInDays(task) {

            var days;

            if (task.deadline) {
                
                var timeDiff = Math.abs(task.deadline.getTime() - Date.now());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                task.deadlineInDays = diffDays;

            }
        }

        return ts;

    }
}());