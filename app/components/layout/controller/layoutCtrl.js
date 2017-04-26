(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",['TaskService', 'DialogService', 'StateService', '$mdSidenav', LayoutCtrl]);

    function LayoutCtrl(TaskService, DialogService, StateService, $mdSidenav) {
        var vm = this;
        
        //Triggered by the FAB button
        function openTaskCreationDialog(event) {
        	return DialogService.openTaskCreationDialog(event);
        }

        function toggleSideNav() {
            $mdSidenav('sidenav').toggle();
        }

        function changeTitle(option){
        	vm.title = option.name;
        }
        
        function changeTitleCloseSidenav(option){
        	changeTitle(option);
        	toggleSideNav();
        }
        
        function goToState(state) {
        	StateService.goToState(state);
        }
        
        vm.FABIcon = 'assignment';
        vm.menuOptions = 
        	[
        	 	{	
        	 		icon:	'home',
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
        	 	{	
        	 		icon: 	'assignment_turned_in',	
        	 		class:	'md-primary',
        	 		ripple: 'rgba(0, 0, 0, 0.3)',
        	 		name:	'Finished',
        	 		link:	'main.finished'
        	 	}
        	 ];
        
        vm.openTaskCreationDialog = openTaskCreationDialog;
        vm.changeTitleCloseSidenav = changeTitleCloseSidenav;
        vm.changeTitle = changeTitle;
        vm.toggleSideNav = toggleSideNav;
    }
}());