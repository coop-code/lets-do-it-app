(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("UnfinishedTasksListCtrl", ['TaskService', 'ToastrService', 'DialogService', '$state', 'TasksValue', UnfinishedTasksListCtrl]);

    function UnfinishedTasksListCtrl(TaskService, ToastrService, DialogService, $state, TasksValue) {

        var vm = this;
        vm.tasks = TasksValue;
         //If there's no unfinished tasks, the default message is displayed
        vm.noUnfinishedTasks = TasksValue.unfinished.length == 0 ? true : false;
        
        //Backend Server Health Check (Lets Do It API)
        TaskService.ping()
        	.then(function () {
        		/*API is online and doing well!*/
        		TaskService.setUnfinishedTasks()
                .then(function () {/*Unfinished tasks set successfully*/})
                .catch(function (error) {ToastrService.error("Error", "There was a problem while fetching unfinished tasks. Please contact the administrator.");console.log('TaskListCtrl error (setUnfinishedTasks): ', error);});
        		
        		})
        	.catch(function (error) {$state.go('main.connectionProblem');});

        
        function deleteTask(task) {
        	ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.deleteTask(task)
                .then(function () {ToastrService.success("Task succesfully deleted.");})
                .catch(function (error) {ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.");console.log('TaskListCtrl error (deleteTask): ', error);});
        }

        function finishTask(task) {
            ToastrService.processing("Finishing", "Please wait while the task is marked as finished...");
            TaskService.finishTask(task)
            	.then(function () {ToastrService.success("Task successfully marked as finished.");})
                .catch(function (error) {ToastrService.error("Error", "There was a problem when trying to mark the task as finished. Please refresh the page before trying again.");console.log('TaskListCtrl error (finishTask): ', error);});
        }

        function changeTaskPriority(task) {
        	if (task.priority == false) ToastrService.processing("Prioritizing", "Please wait while the task is marked as priority...");
        	else ToastrService.processing("Unprioritizing", "Please wait while the task is marked as not priority...");
            TaskService.changeTaskPriority(task)
            	.then(function () {ToastrService.success("Task priority successfully changed.");})
                .catch(function (error) {ToastrService.error("Error", "There was a problem when trying to change the task priority. Please refresh the page before trying again.");console.log('TaskListCtrl error (changeTaskPriority): ', error);});
        }

        function openTaskEditionDialog(event, options, task) {
            var dialogConfig = {
                templateUrl: 'app/components/dialog/view/taskEditionDialogView.html',
                controller: 'TaskEditionDialogCtrl',
                controllerAs: 'vm',
                locals: {
                    task: task
                }
            }
            DialogService.openDialog(event, dialogConfig);
        };
       

        vm.deleteTask = deleteTask;
        vm.finishTask = finishTask;
        vm.changeTaskPriority = changeTaskPriority
        vm.openTaskEditionDialog = openTaskEditionDialog;
    }
}());