//Controller for task-creation-dialog.view.html
(function () {
    'use strict';
    angular.module('letsDoIt').controller('TaskCreationDialogController', TaskCreationDialogController);
    
    TaskCreationDialogController.$inject = ['taskService', 'toastrService', 'dialogService'];

    function TaskCreationDialogController(taskService, toastrService, dialogService) {
        var vm = this;
        vm.ConfirmationDialogIsOpen = false;
        
        //Task model
        vm.task = {
        	title: '',
        	description: '',
            deadline: undefined,
            comments: '',
            priority: false
        }

        //Triggered by the save button
        function submitNewTask() {
        	vm.ConfirmationDialogIsOpen = true;
        	dialogService.openCreateConfirmationDialog(event)
                .then(function (answer) {
                    //Answer can be yes or no. If yes, then proceed with the create operation, otherwise, do nothing.
                	vm.ConfirmationDialogIsOpen = false;
                    if (answer === 'yes') {
                        closeDialog();
                    	toastrService.processing('Creating', 'Please wait while the task is created...');
                        taskService.createTask(vm.task)
                            .then(function () {
                                toastrService.success('Task succesfully created.');
                            })
                            .catch(function (error) {
                            	toastrService.error('Error', 'Please check if the fields were filled correctly.');
                            	console.log('TaskCreationDialogController error (submitNewTask): ', error);
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

        //Triggered by the clear button
        function clearDialog() {
            vm.task.title = '';
            vm.task.description = '';
            vm.task.deadline = undefined;
            vm.task.comments = '';
            vm.task.priority = false;
        }
        
        vm.title = 'New task';
        vm.saveName = 'Save';
        vm.saveIcon = 'save';
        vm.clearName = 'Clear';
        vm.clearIcon = 'format_paint';
        vm.minDate = new Date();
        
        vm.submitNewTask = submitNewTask;
        vm.closeDialog = closeDialog;
        vm.clearDialog = clearDialog;

        
    }
}());