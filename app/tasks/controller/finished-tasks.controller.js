(function () {
    'use strict';
    angular
        .module('letsDoIt')
        .controller('FinishedTasksController', ['taskService', 'toastrService', 'dialogService', 'stateService', 'tasksValue', FinishedTasksController]);

    function FinishedTasksController(taskService, toastrService, dialogService, stateService, tasksValue) {

        var vm = this;
        vm.tasks = tasksValue;

        vm.deleteTask = deleteTask;
        vm.openTaskVisualizationDialog = openTaskVisualizationDialog;
        vm.reopenTask = reopenTask;
        vm.searchTask = searchTask;

        //Backend Server Health Check (Lets Do It API)
        taskService.ping()
            .then(function () {
                /*API is online and doing well!*/
                taskService.setFinishedTasks()
                    .then(function () {
                        /*Finished tasks set successfully*/

                        //If there's no unfinished tasks, the default message is displayed
                        vm.tasks.loadingFinished = false;
                    })
                    .catch(function (error) {
                        toastrService.error('Error', 'There was a problem while fetching finished tasks. Please contact the administrator.');
                        console.log('TaskListController error (setFinishedTasks): ', error);
                    });
            })
            .catch(function (error) {
                stateService.goToConnectionProblem();
            });

        function deleteTask(task, event) {
            dialogService.openDeleteConfirmationDialog(event)
                .then(function (answer) {
                    //Answer can be yes or no. If yes, then proceed with the delete operation, otherwise, do nothing.
                    if (answer === 'yes') {
                        toastrService.processing('Deleting', 'Please wait while the task is deleted...');
                        taskService.deleteTask(task)
                            .then(function () {
                                toastrService.success('Task succesfully deleted.');
                            })
                            .catch(function (error) {
                                toastrService.error('Error', 'There was a problem in the deletion. Please refresh the page before trying again.');
                                console.log('TaskListController error (deleteTask -> openDeleteConfirmationDialog): ', error);
                            });
                    }

                })
                .catch(function () {
                    //Delete cancelled
                });
        }

        function reopenTask(task) {
            dialogService.openReopenConfirmationDialog(event)
                .then(function (answer) {
                    //Answer can be yes or no. If yes, then proceed with the delete operation, otherwise, do nothing.
                    if (answer === 'yes') {
                        toastrService.processing('Reopening', 'Please wait while the task is marked as unfinished...');
                        taskService.reopenTask(task)
                            .then(function () {
                                toastrService.success('Task successfully marked as unfinished.');
                            })
                            .catch(function (error) {
                                toastrService.error('Error', 'There was a problem when trying to mark the task as unfinished. Please refresh the page before trying again.');
                                console.log('FinishedTasksController error (reopenTask): ', error);
                            });
                    }
                })
                .catch(function (error) {
                    //Confirmation cancelled
                });
        }

        function openTaskVisualizationDialog(task, $event) {
            dialogService.openTaskVisualizationDialog(task, $event);
        };

        function searchTask(searchTerms) {
            return function (task) {
                if (searchTerms === '' || searchTerms === null || searchTerms === undefined) return true;
                searchTerms = searchTerms.toLocaleLowerCase();
                return (task.title.toLocaleLowerCase().includes(searchTerms) || task.description.toLocaleLowerCase().includes(searchTerms));
            };
        };

    }
}());