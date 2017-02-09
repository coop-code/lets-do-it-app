(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("FinishedTasksCtrl",
        		FinishedTasksCtrl);

    function FinishedTasksCtrl() {
        var vm = this;
        vm.title = "FINISHED TASKS";
        vm.tasks = [
                    {	"id": 4,
                        "title": "Task nº 4",
                        "description": "Example of finished task",
                        "startDate": "04/01/2017",
                        "dueDate": "10/01/2017",
                        "endDate": "",
                        "done": true,
                        "tags": [ "api", "work", "finished" ]
                    },
                    {	"id": 5,
                        "title": "Task nº 5",
                        "description": "Another example of finished task",
                        "startDate": "07/01/2017",
                        "dueDate": "10/01/2017",
                        "endDate": "",
                        "done": true,
                        "tags": [ "api", "work", "finished" ]
                    }];
        
    }
}());