(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditDialogCtrl", ['TaskService', 'ToastrService','$http','$state', '$mdDialog',TaskEditDialogCtrl]);

    function TaskEditDialogCtrl(TaskService, ToastrService, $http, $state, $mdDialog, $promise ) {
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

        //Triggered by the create button
        vm.submit = function() {
        	ToastrService.clear();
        	ToastrService.processing("Creating", "Please wait while the task is created...");
        	TaskService.save(vm.task)
                .then(
                	//Success callback
                    function(response) {
                    	$mdDialog.hide();
                    	ToastrService.clear();
                    	ToastrService.success("Task created successfully!");
                    	$mdDialog.hide();
                        if($state.current.name == 'main.unfinished') {
                    		$state.reload();
                    	};
                    },
                    //Error callback
                    function (err){
                    	ToastrService.clear();
                    	ToastrService.error("Error", "Please check if the fields were filled correctly.")
                    }
                )
        }
        
        vm.close = function() {
        	$mdDialog.hide();
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