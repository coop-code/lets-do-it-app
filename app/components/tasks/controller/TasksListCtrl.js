(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksListCtrl", ['TaskService', 'toastr', '$http', '$state', TasksListCtrl]);

    function TasksListCtrl(TaskService, toastr, $http, $state, $promise) {

        var vm = this;

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
            TaskService.delete(id)
                .then(
                    function (response) {
                        toastr.success('Task succesfully deleted.');
                        $state.reload();
                    },
                    function (err) {
                        toastr.error('There was a problem in the deletion. Please refresh the page before trying again.')
                    }
                )
        }

        vm.finish = function (id) {
            var finishPromise = TaskService.finish(id);
            finishPromise.then(
                function (response) {
                    toastr.success('Task finished.');
                    $state.reload();
                },
                function (err) {
                    toastr.error('There was a problem when trying to finish the task. Please refresh the page before trying again.')
                }
            )
        }

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