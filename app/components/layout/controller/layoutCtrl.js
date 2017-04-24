(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",['TaskService', 'DialogService', '$mdSidenav', LayoutCtrl]);

    function LayoutCtrl(TaskService, DialogService, $mdSidenav) {
        var vm = this;
        //Dialog
        //Triggered by the FAB button
        function openTaskCreationDialog(event) {
        	return DialogService.openTaskCreationDialog(event);
        }
        

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

        vm.toggleSideNav = function () {
            $mdSidenav('sidenav').toggle();
        }

        vm.openTaskCreationDialog = openTaskCreationDialog;
        
        vm.FABIcon = 'assignment';
    }
}());