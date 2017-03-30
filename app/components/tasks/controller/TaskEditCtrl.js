(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditCtrl", ["TaskService", TaskEditCtrl]);

    function TaskEditCtrl(TaskService) {
        var vm = this;
        
        //Page title
        vm.title = "New Task";
        
        //Task model
        vm.task = {
            title: '',
            detailedDescription: '',
            deadline: undefined,
            comments :'',
            priority: false
        }

        vm.submit = function() {
           //TODO
           //submit to the Task API for creation
        }

        //Triggered by the clear button
        vm.clear = function() {
            vm.task.title = '';
            vm.task.detailedDescription = '';
            vm.task.deadline = null;
            vm.task.comments = '';
            vm.task.priority = false;

        }
    }
    //https://www.tutorialspoint.com/mongodb/mongodb_autoincrement_sequence.htm
}());