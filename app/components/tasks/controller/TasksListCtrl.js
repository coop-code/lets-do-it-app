(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksListCtrl", ["TaskService", TasksListCtrl]);

    function TasksListCtrl(TaskService) {

        var vm = this;
        vm.unfinishedTasks = TaskService.unfinishedTasks();
        CustomizeTasks(vm.unfinishedTasks);

        vm.finishedTasks = TaskService.finishedTasks();

    }

    function CustomizeTasks(tasks) {
        tasks.forEach(function (task) {
            if (task.deadline) {
                task.deadlineInDaysClass = deadlineClass(task.deadlineInDays);

                task.deadlineInDays = deadlineName(task.deadlineInDays);
            };

            task.highlightClass = highlightClass(task.highlighted);

        });
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
            return "ui red label";
        }

        if (deadlineInDays == 0) {
            return "ui orange label";
        }

        if (deadlineInDays <= 5) {
            return "ui yellow label";
        }
        if (deadlineInDays > 5) {
            return "ui green label";
        }
    }

    function highlightClass(highlighted) {
        if (highlighted) {
            return "yellow full star icon";
        }

        return "yellow empty star icon";

    }

}());