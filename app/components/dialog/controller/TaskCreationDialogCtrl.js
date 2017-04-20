(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskCreationDialogCtrl", ['TaskService', 'ToastrService', 'DialogService', TaskCreationDialogCtrl]);

    function TaskCreationDialogCtrl(TaskService, ToastrService, DialogService) {
        var vm = this;
        //Task model
        vm.task = {
        	title: '',
        	description: '',
            deadline: undefined,
            comments: '',
            priority: false
        }

        //Triggered by the create button
        function submit() {
                ToastrService.processing("Creating", "Please wait while the task is created...");
                TaskService.createTask(vm.task)
                	.then(function () {closeDialog(); ToastrService.success("Task successfully created.");})
                	.catch(function (err) {ToastrService.error("Error", "Please check if the fields were filled correctly.");});
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
        
        vm.submit = submit;
        vm.closeDialog = closeDialog;
        vm.clearDialog = clearDialog;
        
        vm.title = "New task";
        vm.saveName = "Save";
        vm.saveIcon = "save";
        vm.clearName = "Clear";
        vm.clearIcon = "format_paint";

        
    }
}());