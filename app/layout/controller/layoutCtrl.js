(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",
                    LayoutCtrl);

    function LayoutCtrl(TaskService, DialogService, $mdSidenav) {
        var vm = this;
        
        vm.openDialog = openDialog;
        
        function openDialog(event) {
        	var dialogConfig = {
        			templateUrl: 'app/components/tasks/views/taskEditView.html',
					controller: 'TaskEditCtrl',
					controllerAs: 'vm',
        	}
        	DialogService(event, dialogConfig);
        };
        
        var menuData = [
                        {	icon:	'home',
                        	class:	'md-primary',
                        	name:	'Home',
                        	link:	'main.home'
                        },
                        {
                        	icon: 	'assignment',
                        	class:	'md-primary',
                        	name:	'Tasks',
                        	link:	'main.unfinished'
                        },
                        {	icon: 	'assignment_turned_in',	
                        	class:	'md-primary',
                        	name:	'Finished',
                        	link:	'main.finished'
                        }
                      ];
        vm.menuOptions = [].concat(menuData);
       
        vm.toggleSideNav = function(){
        	$mdSidenav('sidenav').toggle();
        }
        
        /*
		TaskService.finishedTasks.query(function(tasks){
		    vm.finishedTasksLabel = tasks.length; //Finished tasks count displayed on the side menu
		});
		
        TaskService.unfinishedTasks.query(function(tasks){
		    vm.unfinishedTasksLabel = tasks.length; //Unfinished tasks count displayed on the side menu
		});
        */
    }
}());
