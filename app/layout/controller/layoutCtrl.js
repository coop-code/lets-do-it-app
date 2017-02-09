(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",
                    LayoutCtrl);

    function LayoutCtrl(TaskService) {
        var vm = this;
        vm.variable = "Layout variable";
        
        vm.option1 = "Home";
        vm.option2 = "Tasks";
        vm.option3 = "Finished";
        
        vm.unfinished = TaskService.unfinishedTasksCount(); //This should be provided from a service
        vm.finished = TaskService.finishedTasksCount(); //This should be provided from a service
       
    }
}());
