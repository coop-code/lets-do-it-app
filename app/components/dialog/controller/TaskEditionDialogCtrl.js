(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditionDialogCtrl", ['TaskService', 'ToastrService', 'DialogService', 'task', TaskEditionDialogCtrl]);

    function TaskEditionDialogCtrl(TaskService, ToastrService, DialogService, task) {
        var vm = this;
        vm.task = angular.copy(task);

        //Triggered by the create button
        function submit() {
        	ToastrService.processing("Saving", "Please wait while the task is saved...");
            TaskService.saveEditedTask(task, vm.task)
	        	.then(function () {closeDialog(); ToastrService.success("Task successfully edited and saved.");})
	            .catch(function (err) {ToastrService.error("Error", "Please check if the fields were filled correctly.");});
        }
        
        function closeDialog() {
        	DialogService.closeDialog();
        }
        
        vm.submit = submit;
        vm.closeDialog = closeDialog;
        
        vm.title = "Edit task";
        vm.saveName = "Save";
        vm.saveIcon = "save";
        vm.deleteName = "Delete";
        vm.deleteIcon = "delete";
    }
}());