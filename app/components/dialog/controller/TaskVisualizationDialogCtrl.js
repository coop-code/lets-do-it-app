(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskVisualizationDialogCtrl", ['TaskService', 'ToastrService', 'DialogService', 'task', TaskVisualizationDialogCtrl]);

    function TaskVisualizationDialogCtrl(TaskService, ToastrService, DialogService, task) {
        var vm = this;
        vm.task = task;
        vm.ConfirmationDialogIsOpen = false;
        
        function openDeleteConfirmationDialog(event) {
            var dialogConfig = {
            	templateUrl: 'app/components/dialog/view/deleteConfirmationDialogView.html',
				controller: 'DeleteConfirmationDialogCtrl',
				controllerAs: 'vm',
				multiple : true,
				clickOutsideToClose: false
            }
            return DialogService.openDialog(event, dialogConfig);
        };
        
        //Triggered by the create button
        function deleteTask(event) {
        	vm.ConfirmationDialogIsOpen = true;
        	openDeleteConfirmationDialog(event)
	            .then(function (answer) {
	            	//Answer can be yes or no. If yes, then proceed with the delete operation, otherwise, do nothing.
	            	vm.ConfirmationDialogIsOpen = false;
	                if (answer === 'yes') {
	                	closeDialog();
	                    ToastrService.processing("Deleting", "Please wait while the task is deleted...");
	                    TaskService.deleteTask(task)
	                    	.then(function () {
	                    		ToastrService.success("Task succesfully deleted.");
	                    	})
	                        .catch(function (error) {
	                        	ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.");
	                            console.log('TaskListCtrl error (deleteTask): ', error);
	                        });
	                    }
	                })
	                .catch( function () {
	                	vm.ConfirmationDialogIsOpen = false; //Delete cancelled
	                });
        }
        
        function closeDialog() {
        	DialogService.closeDialog();
        }
        
        vm.deleteTask = deleteTask;
        vm.closeDialog = closeDialog;
        
        vm.title = "Task data";
        vm.deleteName = "Delete";
        vm.deleteIcon = "delete";
    }
}());