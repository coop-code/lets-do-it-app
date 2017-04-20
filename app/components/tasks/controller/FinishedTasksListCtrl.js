(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("FinishedTasksListCtrl", ['TaskService', 'ToastrService', 'DialogService', '$state', 'TasksValue', FinishedTasksListCtrl]);

    function FinishedTasksListCtrl(TaskService, ToastrService, DialogService, $state, TasksValue) {

        var vm = this;
        vm.tasks = TasksValue;
        //If there's no finished tasks, the default message is displayed
        vm.noFinishedTasks = TasksValue.finished.length == 0 ? true : false;
        
        //Backend Server Health Check (Lets Do It API)
        TaskService.ping()
        	.then(function () {
        		/*API is online and doing well!*/
        		TaskService.setFinishedTasks()
            	.then(function () {/*Finished tasks set successfully*/})
    	        .catch(function (error) {ToastrService.error("Error", "There was a problem while fetching finished tasks. Please contact the administrator.");console.log('TaskListCtrl error (setFinishedTasks): ', error);});
        	})
        	.catch(function (error) {$state.go('main.connectionProblem');});

        
        function deleteTask(task) {
        	ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.deleteTask(task)
                .then(function () {ToastrService.success("Task succesfully deleted.");})
                .catch(function (error) {ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.");console.log('TaskListCtrl error (deleteTask): ', error);});
        }

        function openTaskVisualizationDialog(event, options, task) {
            var dialogConfig = {
                templateUrl: 'app/components/dialog/view/taskVisualizationDialogView.html',
                controller: 'TaskVisualizationDialogCtrl',
                controllerAs: 'vm',
                locals: {
                    task: task
                }
            }
            DialogService.openDialog(event, dialogConfig);
        };

        vm.deleteTask = deleteTask;
        vm.openTaskVisualizationDialog = openTaskVisualizationDialog;
    }
}());