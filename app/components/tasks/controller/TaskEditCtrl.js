(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditCtrl", ['TaskService', 'ToastrService','$http','$state', '$mdDialog',TaskEditCtrl]);

    function TaskEditCtrl(TaskService, ToastrService, $http, $state, $mdDialog, $promise ) {
        var vm = this;
        
        //Page title
        vm.title = "New Task";
        
        //Task model
        vm.task = {
            title: '',
            description: '',
            deadline: undefined,
            comments :'',
            priority: false
        }

        vm.submit = function() {
        	$mdDialog.hide();
        	ToastrService.clear();
        	ToastrService.processing("Creating", "Please wait while the task is created...");
           TaskService.save(vm.task)
                .then(
                    function(response) {
                    	ToastrService.clear();
                    	ToastrService.success("Task created successfully!");
                    	if($state.current.name == 'main.unfinished') {
                    		$state.reload();
                    	};
                    },
                    function (err){
                    	ToastrService.clear();
                    	ToastrService.error("Error", "Please check if the fields were filled correctly.")
                    }
                )
        }
        //Triggered by the clear button
        vm.clear = function() {
            vm.task.title = '';
            vm.task.description = '';
            vm.task.deadline = null;
            vm.task.comments = '';
            vm.task.priority = false;
        }
    }
}());