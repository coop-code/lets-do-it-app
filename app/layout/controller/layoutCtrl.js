(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",
                    LayoutCtrl);

    function LayoutCtrl(TaskService, DialogService, $mdSidenav) {
        var vm = this;
        
        vm.openDialog = openDialog;
        
        //Dialog
        //Triggered by the FAB button
        function openDialog(event) {
        	var dialogConfig = {
        			templateUrl: 'app/components/tasks/views/taskEditDialogView.html',
					controller: 'TaskEditDialogCtrl',
					controllerAs: 'vm',
        	}
        	DialogService(event, dialogConfig);
        };
        
        //Sidenav menu entries
        var menuData = [
                        {	icon:	'home',
                        	class:	'md-primary',
                        	ripple: 'rgba(0, 0, 0, 0.3)',
                        	name:	'Home',
                        	link:	'main.home'
                        },
                        {
                        	icon: 	'assignment',
                        	class:	'md-primary',
                        	ripple: 'rgba(0, 0, 0, 0.3)',
                        	name:	'Tasks',
                        	link:	'main.unfinished'
                        },
                        {	icon: 	'assignment_turned_in',	
                        	class:	'md-primary',
                        	ripple: 'rgba(0, 0, 0, 0.3)',
                        	name:	'Finished',
                        	link:	'main.finished'
                        }
                      ];
        vm.menuOptions = [].concat(menuData);
       
        vm.toggleSideNav = function(){
        	$mdSidenav('sidenav').toggle();
        }
        
        vm.FABIcon = 'menu';
        vm.FABMorphingOptions = {
        		duration: 500, 
        		easing: 'sine-out'
        }
        vm.mouseEnterMorph = function() {
            if (vm.FABIcon === 'menu') {
            	vm.FABIcon = 'edit';
            }
            else {
            	vm.FABIcon = 'menu';
            }
        };
        vm.mouseLeaveMorph = function() {
            if (vm.FABIcon === 'edit') {
            	vm.FABIcon = 'menu';
            }
            else {
            	vm.FABIcon = 'edit';
            }
        };
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
