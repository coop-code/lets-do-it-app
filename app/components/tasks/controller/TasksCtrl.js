(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksCtrl",
            ["TaskService", TasksCtrl]);

    function TasksCtrl(TaskService) {
        
        var vm = this;
        vm.unfinishedTasks = TaskService.unfinishedTasks(); 
        vm.finishedTasks = TaskService.finishedTasks(); 

    }
}());