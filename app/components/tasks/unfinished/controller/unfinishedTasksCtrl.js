(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("UnfinishedTasksCtrl",
        		UnfinishedTasksCtrl);

    function UnfinishedTasksCtrl() {
        var vm = this;
        vm.title = "UNFINISHED TASKS";
        vm.tasks = [
                    {	"id": 8,
                        "title": "Task nº 8",
                        "description": "Example of unfinished task",
                        "startDate": "04/01/2017",
                        "dueDate": "10/01/2017",
                        "endDate": "",
                        "done": false,
                        "tags": [ "api", "work", "unfinished" ]
                    },
                    {	"id": 10,
                        "title": "Task nº 10",
                        "description": "Another example of unfinished task",
                        "startDate": "04/01/2017",
                        "dueDate": "09/01/2017",
                        "endDate": "",
                        "done": false,
                        "tags": [ "api", "work", "unfinished" ]
                    }];
        
    }
}());