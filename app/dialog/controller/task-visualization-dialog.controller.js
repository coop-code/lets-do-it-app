//Controller for task-visualization-dialog.view.html
(function () {
    'use strict';
    angular.module('letsDoIt').controller('TaskVisualizationDialogController', TaskVisualizationDialogController);
    
    TaskVisualizationDialogController.$inject = ['taskService', 'toastrService', 'dialogService', 'task'];

    function TaskVisualizationDialogController(taskService, toastrService, dialogService, task) {
        var vm = this;
        vm.task = task;
        vm.ConfirmationDialogIsOpen = false;

        //Triggered by the delete button
        function deleteTask(event) {
        	vm.ConfirmationDialogIsOpen = true;
        	dialogService.openDeleteConfirmationDialog(event)
	            .then(function (answer) {
	            	//Answer can be yes or no. If yes, then proceed with the delete operation, otherwise, do nothing.
	            	vm.ConfirmationDialogIsOpen = false;
	                if (answer === 'yes') {
	                	closeDialog();
	                    toastrService.processing('Deleting', 'Please wait while the task is deleted...');
	                    taskService.deleteTask(task)
	                    	.then(function () {
	                    		toastrService.success('Task succesfully deleted.');
	                    	})
	                        .catch(function (error) {
	                        	toastrService.error('Error', 'There was a problem in the deletion. Please refresh the page before trying again.');
	                            console.log('TaskListController error (deleteTask): ', error);
	                        });
	                    }
	                })
	                .catch( function () {
	                	vm.ConfirmationDialogIsOpen = false; //Delete cancelled
	                });
        }
        
        function closeDialog() {
        	dialogService.closeDialog();
        }
        
        vm.title = 'Task data';
        vm.deleteName = 'Delete';
        vm.deleteIcon = 'delete';
        
        vm.deleteTask = deleteTask;
        vm.closeDialog = closeDialog;
    }
}());