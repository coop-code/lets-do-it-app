(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskVisualizationDialogCtrl", ['TaskService', 'ToastrService', 'DialogService', 'task', TaskVisualizationDialogCtrl]);

    function TaskVisualizationDialogCtrl(TaskService, ToastrService, DialogService, task) {
        var vm = this;
        vm.task = task;
        
        //Triggered by the create button
        function deleteTask() {
        	ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.deleteTask(task)
                .then(function () {closeDialog(); ToastrService.success("Task succesfully deleted.");})
                .catch(function (error) {ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.");console.log('TaskVisualizationDialogCtrl error (deleteTask): ', error);});
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