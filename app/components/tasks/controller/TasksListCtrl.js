(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksListCtrl", ["TaskService", TasksListCtrl]);

    function TasksListCtrl(TaskService) {

        var vm = this;


        TaskService.unfinishedTasks.query(function (tasks) {
            vm.unfinishedTasks = tasks;
            tasks.forEach(function (task) {
                CalculateDeadlineInDays(task);
                CustomizeTask(task);
            });
        });

        TaskService.finishedTasks.query(function (tasks) {
            vm.finishedTasks = tasks;
            tasks.forEach(function (task) {
                CalculateDeadlineInDays(task);
                CustomizeTask(task);
            });
        });

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

        if (task.deadline) {
            task.deadlineInDaysClass = deadlineClass(task.deadlineInDays);

            task.deadlineInDays = deadlineName(task.deadlineInDays);
        };

        task.priorityClass = priorityClass(task.priority);


    }

    function deadlineName(deadlineInDays) {

        if (deadlineInDays == 0) {
            return "Today";
        }

        if (deadlineInDays == 1) {
            return deadlineInDays + " day";
        }

        return deadlineInDays + " days";


    }

    function deadlineClass(deadlineInDays) {
        if (deadlineInDays <= -1) {
            return "ui ribbon red label";
        }

        if (deadlineInDays == 0) {
            return "ui ribbon orange label";
        }

        if (deadlineInDays <= 5) {
            return "ui ribbon yellow label";
        }
        if (deadlineInDays > 5) {
            return "ui ribbon green label";
        }
    }

    function priorityClass(priority) {
        if (priority) {
            return "star";
        }

        return "star_border";

    }

}());