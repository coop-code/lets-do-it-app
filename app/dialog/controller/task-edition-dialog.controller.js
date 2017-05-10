(function () {
    'use strict';
    angular
        .module('letsDoIt')
        .controller('TaskEditionDialogController', ['taskService', 'toastrService', 'dialogService', 'task', TaskEditionDialogController]);

    function TaskEditionDialogController(taskService, toastrService, dialogService, task) {
        var vm = this;
        vm.task = angular.copy(task); //Deep copy so we don't change the card while we change the inputs in the dialog. Changes will happen only after a successful submit.
        vm.ConfirmationDialogIsOpen = false;

        //Triggered by the create button
        function submitEditedTask() {
            toastrService.processing('Saving', 'Please wait while the task is saved...');
            taskService.saveEditedTask(task, vm.task)
                .then(function () {
                    closeDialog();
                    toastrService.success('Task successfully edited and saved.');
                })
                .catch(function (err) {
                    toastrService.error('Error', 'Please check if the fields were filled correctly.');
                    console.log('TaskEditionDialogController error (submitEditedTask): ', error);
                });
        }
        
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

        vm.title = 'Edit task';
        vm.saveName = 'Save';
        vm.saveIcon = 'save';
        vm.deleteName = 'Delete';
        vm.deleteIcon = 'delete';
        vm.minDate = new Date()
        
        vm.submitEditedTask = submitEditedTask;
        vm.deleteTask = deleteTask;
        vm.closeDialog = closeDialog;
        
       ;
    }
}());