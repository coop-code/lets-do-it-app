(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("DialogService",
        		function($mdDialog) {
        			return DialogService;
        	
        			function DialogService(event, config) {
        				var defaults = {
        						clickOutsideToClose: true,
        						targetEvent: event
        				}
        				return $mdDialog.show(angular.extend(defaults, config));
        			}
        	});
}());