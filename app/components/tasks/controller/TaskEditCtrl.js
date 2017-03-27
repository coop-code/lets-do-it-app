(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditCtrl", ["TaskService", TaskEditCtrl]);

    function TaskEditCtrl(TaskService) {
        var vm = this;
        this.title = "New Task Form (todo)";
    }

    //https://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm

}());