(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("UnfinishedTasksCtrl",
            UnfinishedTasksCtrl);

    function UnfinishedTasksCtrl() {
        var vm = this;
        vm.title = "UNFINISHED TASKS";
        vm.tasks = [{
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
                "id": 5,
                "title": "Finish the tasks list layout",
                "description": "The task list needs to be revised",
                "registrationDate": new Date("02/09/2017"),
                "done": false,
            }
        ];

    }
}());