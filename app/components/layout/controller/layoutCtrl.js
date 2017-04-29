(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",['TaskService', 'DialogService', 'StateService', 'SidenavService', LayoutCtrl]);

    function LayoutCtrl(TaskService, DialogService, StateService, SidenavService) {
        var vm = this;
        
        //Triggered by the FAB button
        function openTaskCreationDialog(event) {
        	return DialogService.openTaskCreationDialog(event);
        }

        function toggleSideNav(sidenavID) {
        	SidenavService.toggleSidenav(sidenavID);
        }
        
        function updateCurrentStateAndTitleSidenav(option, sidenavID){
        	updateCurrentStateAndTitleTabs(option);
        	SidenavService.toggleSidenav(sidenavID);
        }

        function updateCurrentStateAndTitleTabs(option) {
        	vm.currentState = option.link;
        	vm.title = option.name;
        }

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
        vm.currentState = StateService.getCurrentState().name;
        vm.title = 
        	vm.currentState === "main.connectionProblem"
        	? "Can't do it :(" 
        	: vm.menuOptions[vm.menuOptions.map(function(e) { return e.link; }).indexOf(vm.currentState)].name;
        
        vm.openTaskCreationDialog = openTaskCreationDialog;
        vm.updateCurrentStateAndTitleSidenav = updateCurrentStateAndTitleSidenav;
        vm.updateCurrentStateAndTitleTabs = updateCurrentStateAndTitleTabs;
        vm.toggleSideNav = toggleSideNav;
    }
}());