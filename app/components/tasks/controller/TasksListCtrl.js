(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksListCtrl", ['TaskService', 'ToastrService', 'DialogService', '$http', '$state', 'TasksValue', TasksListCtrl]);

    function TasksListCtrl(TaskService, ToastrService, DialogService, $http, $state, TasksValue, $promise) {

        var vm = this;
        vm.tasks = TasksValue;
        
        //Backend Server Health Check (Lets Do It API)
        TaskService.ping()
        	.then(function () {/*API is online and doing well!*/})
        	.catch(function (err) {$state.go('main.connectionProblem');});

        TaskService.setUnfinishedTasks()
            .then(function () {/*Unfinished tasks set successfully*/})
            .catch(function (err) {console.log('TaskListCtrl error (setUnfinishedTasks): ', error);});

        TaskService.setFinishedTasks()
        	.then(function () {/*Finished tasks set successfully*/})
	        .catch(function (err) {console.log('TaskListCtrl error (setFinishedTasks): ', error);});

        function deleteTask(task) {
        	ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.deleteTask(task)
                .then(function () {ToastrService.success("Task succesfully deleted.");})
                .catch(function (err) {ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.");});
        }

        function finishTask(task) {
            ToastrService.processing("Finishing", "Please wait while the task is marked as finished...");
            TaskService.finishTask(task)
            	.then(function () {ToastrService.success("Task successfully marked as finished.");})
                .catch(function (err) {ToastrService.error("Error", "There was a problem when trying to mark the task as finished. Please refresh the page before trying again.");});
        }

        function changeTaskPriority(task) {
        	if (task.priority == false) ToastrService.processing("Prioritizing", "Please wait while the task is marked as priority...");
        	else ToastrService.processing("Unprioritizing", "Please wait while the task is marked as not priority...");
            TaskService.changeTaskPriority(task)
            	.then(function () {ToastrService.success("Task successfully marked as finished.");})
                .catch(function (err) {ToastrService.error("Error", "There was a problem when trying to mark the task as finished. Please refresh the page before trying again.");});
        }

        function openDialog(event, options, task) {
            var dialogConfig = {
                templateUrl: 'app/components/tasks/views/taskEditDialogView.html',
                controller: 'TaskEditDialogCtrl',
                controllerAs: 'vm',
                locals: {
                    task: task
                }
            }

            DialogService(event, dialogConfig);
        };

        vm.deleteTask = deleteTask;
        vm.finishTask = finishTask;
        vm.changeTaskPriority = changeTaskPriority
        vm.openDialog = openDialog;
    }
}());