(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TasksCtrl", ["TaskService", TasksCtrl]);

    function TasksCtrl(TaskService) {

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
}());