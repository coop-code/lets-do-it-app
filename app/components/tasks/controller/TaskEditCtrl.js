(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditCtrl", ['TaskService', 'toastr','$http','$state', TaskEditCtrl]);

    function TaskEditCtrl(TaskService, toastr, $http, $state, $promise ) {
        var vm = this;
        
        //Page title
        vm.title = "New Task";
        
        //Task model
        vm.task = {
            title: '',
            description: '',
            deadline: undefined,
            comments :'',
            priority: false
        }

        vm.submit = function() {
           
           TaskService.save(vm.task)
                .then(
                    function(response) {
                        toastr.success('Task created successfully!');
                        $state.go("main.unfinished");
                    },
                    function (err){
                        toastr.error('Error on task creation. Please check if the fields were filled correctly.')
                    }
                )
        }
        //Triggered by the clear button
        vm.clear = function() {
            vm.task.title = '';
            vm.task.description = '';
            vm.task.deadline = null;
            vm.task.comments = '';
            vm.task.priority = false;

        }
    }
}());