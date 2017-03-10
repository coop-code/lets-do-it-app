(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",
                    LayoutCtrl);

    function LayoutCtrl(TaskService) {
        var vm = this;
        
        vm.finishedTasksLabel;
        vm.unfinishedTasksLabel
        
        vm.homeOption = "Home";
        
        vm.finishedTasksOption = "Finished";
		TaskService.finishedTasks.query(function(tasks){
		    vm.finishedTasksLabel = tasks.length; //Finished tasks count displayed on the side menu
		});
		
        vm.unfinishedTasksOption = "Tasks";
        TaskService.unfinishedTasks.query(function(tasks){
		    vm.unfinishedTasksLabel = tasks.length; //Unfinished tasks count displayed on the side menu
		});
    }
}());
