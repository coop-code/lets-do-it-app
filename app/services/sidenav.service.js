(function () {
	'use strict';
	angular
		.module('letsDoIt')
		.factory('sidenavService', ['$mdSidenav', sidenavService]);

	function sidenavService($mdSidenav) {
		
		function toggleSidenav(sidenavID) {
			return $mdSidenav(sidenavID).toggle();;
		}
		
		//Public calls
        return {
        	toggleSidenav: toggleSidenav
        }
	}
}());