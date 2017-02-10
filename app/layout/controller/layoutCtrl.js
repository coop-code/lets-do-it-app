(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",
                    LayoutCtrl);

    function LayoutCtrl(TaskService) {
        var vm = this;
        
        vm.homeOption = "Home";
        
        vm.finishedTasksOption = "Finished";
        vm.finishedTasksLabel = TaskService.finishedTasksCount(); //This should be provided from a service
        
        vm.unfinishedTasksOption = "Tasks";
        vm.unfinishedTasksLabel = TaskService.unfinishedTasksCount(); //This should be provided from a service
    }
}());
