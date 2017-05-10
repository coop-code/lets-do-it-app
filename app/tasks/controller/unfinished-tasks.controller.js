(function () {
    'use strict';
    angular
        .module('letsDoIt')
        .controller('UnfinishedTasksController', ['taskService', 'toastrService', 'dialogService', 'stateService', 'tasksValue', UnfinishedTasksController]);

    function UnfinishedTasksController(taskService, toastrService, dialogService, stateService, tasksValue) {

        var vm = this;
        vm.tasks = tasksValue;


        vm.deleteTask = deleteTask;
        vm.finishTask = finishTask;
        vm.changeTaskPriority = changeTaskPriority;
        vm.openTaskEditionDialog = openTaskEditionDialog;

        //Backend Server Health Check (Lets Do It API)
        taskService.ping()
            .then(function () {
                /*API is online and doing well!*/
                taskService.setUnfinishedTasks()
                    .then(function () {
                        /*Unfinished tasks set successfully*/

                        //If there's no unfinished tasks, the default message is displayed
                        vm.tasks.loadingUnfinished = false;
                    })
                    .catch(function (error) {
                        toastrService.error('Error', 'There was a problem while fetching unfinished tasks. Please contact the administrator.');
                        console.log('TaskListController error (setUnfinishedTasks): ', error);
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
                .catch( function (error) {
                	//Delete cancelled
                });
        }

        function finishTask(task) {
        	dialogService.openFinishConfirmationDialog(event)
        	.then(function (answer) {
        		//Answer can be yes or no. If yes, then proceed with the delete operation, otherwise, do nothing.
                if (answer === 'yes') {
		            toastrService.processing('Finishing', 'Please wait while the task is marked as finished...');
		            taskService.finishTask(task)
		                .then(function () {
		                    toastrService.success('Task successfully marked as finished.');
		                })
		                .catch(function (error) {
		                    toastrService.error('Error', 'There was a problem when trying to mark the task as finished. Please refresh the page before trying again.');
		                    console.log('TaskListController error (finishTask): ', error);
		                });
                }
        	})
            .catch( function (error) {
            	//Confirmation cancelled
            });
        }

        function changeTaskPriority(task) {
            if (task.priority == false) toastrService.processing('Prioritizing', 'Please wait while the task is marked as priority...');
            else toastrService.processing('Unprioritizing', 'Please wait while the task is marked as not priority...');
            taskService.changeTaskPriority(task)
                .then(function () {
                    toastrService.success('Task priority successfully changed.');
                })
                .catch(function (error) {
                    toastrService.error('Error', 'There was a problem when trying to change the task priority. Please refresh the page before trying again.');
                    console.log('TaskListController error (changeTaskPriority): ', error);
                });
        }
        
        function openTaskEditionDialog(task, event) {
            dialogService.openTaskEditionDialog(task, event);
        };
    }
}());