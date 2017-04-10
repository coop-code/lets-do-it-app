(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksListCtrl", ['TaskService', 'ToastrService', 'DialogService', '$http', '$state', TasksListCtrl]);

    function TasksListCtrl(TaskService, ToastrService, DialogService , $http, $state, $promise) {

        var vm = this;

        //Backend Server Health Check (Lets Do It API)
        TaskService.ping().then(function (response) {
            //API is online and doing well!
        }, function (error) {
            $state.go('main.connectionProblem');
        });

        TaskService.unfinishedTasks()
            .then(function (response) {
                var tasks = response.data;
                tasks.forEach(function (task) {
                    CalculateDeadlineInDays(task);
                    CustomizeTask(task);
                });

                vm.unfinishedTasks = tasks
            }, function (err) {
                console.log(err);
            });

        TaskService.finishedTasks()
            .then(function (response) {
                var tasks = response.data;
                tasks.forEach(function (task) {
                    CalculateDeadlineInDays(task);
                    CustomizeTask(task);
                });

                vm.finishedTasks = tasks
            }, function (err) {
                console.log(err);
            });

        vm.delete = function (id) {
            ToastrService.clear();
            ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.delete(id)
                .then(
                    function (response) {
                        ToastrService.clear();
                        ToastrService.success("Task succesfully deleted.");
                        $state.reload();
                    },
                    function (err) {
                        ToastrService.clear();
                        ToastrService.error("Error", "There was a problem in the deletion. Please refresh the page before trying again.")
                    }
                )
        }

        vm.finish = function (id) {
            var finishPromise = TaskService.finish(id);
            ToastrService.clear();
            ToastrService.processing("Finishing", "Please wait while the task is marked as finished...");
            finishPromise.then(
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
        vm.openDialog = openDialog;

        //Dialog
        function openDialog(event, options, taskId) {
            var dialogConfig = {
                templateUrl: 'app/components/tasks/views/taskEditDialogView.html',
                controller: 'TaskEditDialogCtrl',
                controllerAs: 'vm',
                locals: {
                    id: taskId
                }
            }
          
            DialogService(event, dialogConfig);
        };

    }

    function CalculateDeadlineInDays(task) {

        var days;

        if (task.deadline) {

            task.deadline = new Date(task.deadline);
            var timeDiff = task.deadline.getTime() - Date.now();
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

            task.deadlineInDays = diffDays;

        }
    }

    function CustomizeTask(task) {
        task.priorityClass = priorityClass(task.priority);
    }

    function priorityClass(priority) {
        if (priority) {
            return "star";
        }
        return "star_border";
    }

}());