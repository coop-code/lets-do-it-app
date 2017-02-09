(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksCtrl",
            TasksCtrl);

    function TasksCtrl() {
        var vm = this;
        vm.unfinishedTasks = [{
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
            }
        ];

        vm.finishedTasks = [{
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

    }
}());