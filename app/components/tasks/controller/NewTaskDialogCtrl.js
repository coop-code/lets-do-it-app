(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("NewTaskDialogCtrl", ['TaskService', 'toastr','$http','$state', '$mdDialog',NewTaskDialogCtrl]);

    function NewTaskDialogCtrl(TaskService, toastr, $http, $state, $mdDialog, $promise ) {
        var vm = this;
        
        //Page title
        vm.title = "Creating a new task";
        
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
                        $mdDialog.hide();
                        console.log($state.current.name);
                        $state.refresh();
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