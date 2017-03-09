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
        
        //Unfinished tasks count displayed on the side menu
        TaskService.unfinishedTasks.query(function(tasks){
            vm.unfinished = tasks.length;
        });

       //Finished tasks count displayed on the side menu
       TaskService.finishedTasks.query(function(tasks){
            vm.finished = tasks.length;
        });
       
    }
}());
