(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("FinishedTasksListCtrl", ['TaskService', 'ToastrService', 'DialogService', '$state', 'TasksValue', FinishedTasksListCtrl]);

    function FinishedTasksListCtrl(TaskService, ToastrService, DialogService, $state, TasksValue) {

        var vm = this;
        vm.tasks = TasksValue;


        //Backend Server Health Check (Lets Do It API)
        TaskService.ping()
            .then(function () {
                /*API is online and doing well!*/
                TaskService.setFinishedTasks()
                    .then(function () {
                        /*Finished tasks set successfully*/

                        //If there's no finished tasks, the default message is displayed
                        vm.noFinishedTasks = TasksValue.finished.length == 0 ? true : false;
                    })
                    .catch(function (error) {
                        ToastrService.error("Error", "There was a problem while fetching finished tasks. Please contact the administrator.");
                        console.log('TaskListCtrl error (setFinishedTasks): ', error);
                    });
            })
            .catch(function (error) {
                $state.go('main.connectionProblem');
            });

        function deleteTask(task) {

            DialogService.openDeleteConfirmationDialog(event)
                .then(function (answer) {

                    //Answer can be yes or no. If yes, then proceed with the delete operation, otherwise, do nothing.
                    if (answer === 'yes') {
                        ToastrService.processing("Deleting", "Please wait while the task is deleted...");
                        TaskService.deleteTask(task)
                            .then(function () {
                                ToastrService.success("Task succesfully deleted.");
                            })
                            .catch(function (error) {
                                ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.");
                                console.log('TaskListCtrl error (deleteTask): ', error);
                            });
                    }

                }, function () {
                    //Delete cancelled
                });
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