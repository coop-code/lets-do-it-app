(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("DialogService",
        	['$mdDialog', DialogService]);
    
    function DialogService($mdDialog) {

    	function openDialog(event, config) {
        	var defaults = {
        		clickOutsideToClose: true,
        		targetEvent: event
        	}
        	return $mdDialog.show(angular.extend(defaults, config));
        }
    	
    	function closeDialog() {
        	$mdDialog.hide();
        }

    	return {
    		openDialog: function (event, config) {
                return openDialog(event, config);
            },
	    	closeDialog: function () {
	            closeDialog();
	        }
        }
    }
}());


























