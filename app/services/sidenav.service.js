//Service for sidenav
(function () {
	'use strict';
	angular.module('letsDoIt').factory('sidenavService', sidenavService);
	
	sidenavService.$inject = ['$mdSidenav'];

	function sidenavService($mdSidenav) {
		
		//Toggle the specific sidenav whose ID is sidenavID
		function toggleSidenav(sidenavID) {
			return $mdSidenav(sidenavID).toggle();;
		}
		
		//Public calls
        return {
        	toggleSidenav: toggleSidenav
        };
	}
}());