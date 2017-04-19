(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksListCtrl", ['TaskService', 'ToastrService', 'DialogService', '$http', '$state', 'TasksValue', TasksListCtrl]);

    function TasksListCtrl(TaskService, ToastrService, DialogService, $http, $state, TasksValue, $promise) {

        var vm = this;
        
        vm.tasks = TasksValue;
        
        //Backend Server Health Check (Lets Do It API)
        TaskService.ping().then(function (response) {
            //API is online and doing well!
        }, function (error) {
            $state.go('main.connectionProblem');
        });

        TaskService.setUnfinishedTasks()
            .then(function () {
            	//Unfinished tasks set successfully
            })
            .catch(function (err) {
    			console.log('TaskListCtrl error (setUnfinishedTasks): ', error);
            });

        TaskService.setFinishedTasks()
	        .then(function () {
	        	//Finished tasks set successfully
	        })
	        .catch(function (err) {
				console.log('TaskListCtrl error (setFinishedTasks): ', error);
	        });

        vm.deleteTask = function (task) {
            ToastrService.clear();
            ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.deleteTask(task)
                .then(
                    function () {
                        ToastrService.clear();
                        ToastrService.success("Task succesfully deleted.");
                    },
                    function (err) {
                        ToastrService.clear();
                        ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.")
                    }
                )
        }

        vm.finish = function (task) {
            ToastrService.clear();
            ToastrService.processing("Finishing", "Please wait while the task is marked as finished...");
            //Mark task as finished
            task.done = true;
            TaskService.save(task).then(
                function (response) {
                    ToastrService.clear();
                    ToastrService.success("Task successfully marked as finished.");
                    $state.reload();
                },
                function (err) {
                    ToastrService.clear();
                    ToastrService.error("Error", "There was a problem when trying to mark the task as finished. Please refresh the page before trying again.")
                }
            )
        }

        vm.prioritize = function (task) {
            ToastrService.clear();
            if (task.priority == false) {
                ToastrService.processing("Priorizing", "Please wait while the task is marked as priority...");
            } else {
                ToastrService.processing("Unpriorizing", "Please wait while the task is marked as not priority...");
            }
            //Mark task as priority
            task.priority = !task.priority;
            TaskService.save(task).then(
                function (response) {
                    ToastrService.clear();
                    ToastrService.success("Task priority successfully updated.");
                    $state.reload();
                },
                function (err) {
                    ToastrService.clear();
                    ToastrService.error("Error", "There was a problem when trying to change the task priority. Please refresh the page before trying again.")
                }
            )
        }

        vm.openDialog = openDialog;
        //Dialog
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

    }
}());