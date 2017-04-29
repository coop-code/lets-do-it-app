(function () {
	"use strict";
	angular
		.module("letsDoIt")
		.factory("SidenavService", ['$mdSidenav', SidenavService]);

	function SidenavService($mdSidenav) {
		
		function toggleSidenav(sidenavID) {
			return $mdSidenav(sidenavID).toggle();;
		}
		
		//Public calls
        return {
        	toggleSidenav: toggleSidenav
        }
	}
}());