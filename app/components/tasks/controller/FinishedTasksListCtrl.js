(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("FinishedTasksListCtrl", ['TaskService', 'ToastrService', 'DialogService', 'StateService', 'TasksValue', FinishedTasksListCtrl]);

    function FinishedTasksListCtrl(TaskService, ToastrService, DialogService, StateService, TasksValue) {

        var vm = this;
        vm.tasks = TasksValue;

        //Backend Server Health Check (Lets Do It API)
        TaskService.ping()
            .then(function () {
                /*API is online and doing well!*/
                TaskService.setFinishedTasks()
                    .then(function () {
                        /*Finished tasks set successfully*/
                    	
                    	//If there's no unfinished tasks, the default message is displayed
                        vm.tasks.loadingFinished = false;
                    })
                    .catch(function (error) {
                        ToastrService.error("Error", "There was a problem while fetching finished tasks. Please contact the administrator.");
                        console.log('TaskListCtrl error (setFinishedTasks): ', error);
                    });
            })
            .catch(function (error) { 
            	StateService.goToConnectionProblem();
            });
        
        function deleteTask(task, event) {
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
                                console.log('TaskListCtrl error (deleteTask -> openDeleteConfirmationDialog): ', error);
                            });
                    }

                })
                .catch( function () {
                    //Delete cancelled
                });
        }

        function openTaskVisualizationDialog(task, $event) {
            DialogService.openTaskVisualizationDialog(task, $event);
        };
        
        function searchTask(searchTerms) {
            return function(task) {
            	if(searchTerms === '' || searchTerms === null || searchTerms === undefined) return true;
            	searchTerms = searchTerms.toLocaleLowerCase();
            	return (task.title.toLocaleLowerCase().includes(searchTerms) || task.description.toLocaleLowerCase().includes(searchTerms));
            };
        };

        vm.deleteTask = deleteTask;
        vm.openTaskVisualizationDialog = openTaskVisualizationDialog;
        vm.searchTask = searchTask;
    }
}());