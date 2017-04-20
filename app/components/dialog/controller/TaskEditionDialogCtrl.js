(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditionDialogCtrl", ['TaskService', 'ToastrService', 'DialogService', 'task', TaskEditionDialogCtrl]);

    function TaskEditionDialogCtrl(TaskService, ToastrService, DialogService, task) {
        var vm = this;
        vm.task = task;
        
        //Triggered by the create button
        function submitEditedTask() {
        	ToastrService.processing("Saving", "Please wait while the task is saved...");
            TaskService.saveEditedTask(task, vm.task)
	        	.then(function () {closeDialog(); ToastrService.success("Task successfully edited and saved.");})
	            .catch(function (err) {ToastrService.error("Error", "Please check if the fields were filled correctly.");console.log('TaskEditionDialogCtrl error (submitEditedTask): ', error);});
        }
        
        function deleteTask() {
        	ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.deleteTask(task)
                .then(function () {closeDialog(); ToastrService.success("Task succesfully deleted.");})
                .catch(function (error) {ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.");console.log('TaskEditionDialogCtrl error (deleteTask): ', error);});
        }
        
        function closeDialog() {
        	DialogService.closeDialog();
        }
        
        vm.submitEditedTask = submitEditedTask;
        vm.deleteTask = deleteTask;
        vm.closeDialog = closeDialog;
        
        vm.title = "Edit task";
        vm.saveName = "Save";
        vm.saveIcon = "save";
        vm.deleteName = "Delete";
        vm.deleteIcon = "delete";
    }
}());