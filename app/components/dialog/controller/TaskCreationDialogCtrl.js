(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskCreationDialogCtrl", ['TaskService', 'ToastrService', 'DialogService', TaskCreationDialogCtrl]);

    function TaskCreationDialogCtrl(TaskService, ToastrService, DialogService) {
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

        //Triggered by the create button
        function submitNewTask() {
        	vm.ConfirmationDialogIsOpen = true;
        	DialogService.openCreateConfirmationDialog(event)
                .then(function (answer) {
                    //Answer can be yes or no. If yes, then proceed with the create operation, otherwise, do nothing.
                	vm.ConfirmationDialogIsOpen = false;
                    if (answer === 'yes') {
                        closeDialog();
                    	ToastrService.processing("Creating", "Please wait while the task is created...");
                        TaskService.createTask(vm.task)
                            .then(function () {
                                ToastrService.success("Task succesfully created.");
                            })
                            .catch(function (error) {
                            	ToastrService.error("Error", "Please check if the fields were filled correctly.");
                            	console.log('TaskCreationDialogCtrl error (submitNewTask): ', error);
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

        //Triggered by the clear button
        function clearDialog() {
            vm.task.title = '';
            vm.task.description = '';
            vm.task.deadline = undefined;
            vm.task.comments = '';
            vm.task.priority = false;
        }
        
        vm.title = "New task";
        vm.saveName = "Save";
        vm.saveIcon = "save";
        vm.clearName = "Clear";
        vm.clearIcon = "format_paint";
        vm.minDate = new Date();
        
        vm.submitNewTask = submitNewTask;
        vm.closeDialog = closeDialog;
        vm.clearDialog = clearDialog;

        
    }
}());