//Controller for layout.view.html
(function () {
    'use strict';
    angular.module('letsDoIt').controller('LayoutController', LayoutController);
    
    LayoutController.$inject = ['dialogService', 'stateService', 'sidenavService'];

    function LayoutController(dialogService, stateService, sidenavService) {
        var vm = this;

		vm.openTaskCreationDialog = openTaskCreationDialog;
        vm.updateCurrentStateAndTitleSidenav = updateCurrentStateAndTitleSidenav;
        vm.updateCurrentStateAndTitleTabs = updateCurrentStateAndTitleTabs;
        vm.toggleSideNav = toggleSideNav;
        
        //Triggered by the FAB button
        function openTaskCreationDialog(event) {
        	return dialogService.openTaskCreationDialog(event);
        }

        //Triggered by the Menu icon button, shown when the screen is of a small size
        function toggleSideNav(sidenavID) {
        	sidenavService.toggleSidenav(sidenavID);
        }
        
        //Tabs are updated to reflect current state when said state is chosen using the sidenav
        function updateCurrentStateAndTitleSidenav(option, sidenavID){
        	updateCurrentStateAndTitleTabs(option);
        	sidenavService.toggleSidenav(sidenavID);
        }

        //Tabs update
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
        vm.currentState = stateService.getCurrentState().name; //Name of current state when first loading or reloading the app
      
        //If initial state is connectionProblem, title is 'Can't do it'.
        //Otherwise, maps only the 'links' in 'menuOptions' elements in order to obtain an array of Strings and get the index of currentState in said array.
        //Then, set title to the 'name' of the element whose index is the found index.
        vm.title = 
        	vm.currentState === 'main.connectionProblem'
        	? 'Can\'t do it :(' 
        	: vm.menuOptions[vm.menuOptions.map(function(e) { return e.link; }).indexOf(vm.currentState)].name;  
        
    }
}());