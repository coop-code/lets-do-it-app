(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("DialogService",
        	DialogService);
    
    function DialogService($mdDialog) {
    	return DialogServiceElement;
        
    	function DialogServiceElement(event, config, task) {
        	var defaults = {
        		clickOutsideToClose: true,
        		targetEvent: event
        	}
        	return $mdDialog.show(angular.extend(defaults, config));
        }
    }
}());