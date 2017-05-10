//Toastr configuration
(function () {
	'use strict';
	angular
		.module('letsDoIt')
		.config(['toastrConfig', ToastrConfig]);
	
	function ToastrConfig(toastrConfig) {
		
		angular.extend(toastrConfig, {
			autoDismiss: false,
		    containerId: 'toast-container',
		    maxOpened: 1,    
		    newestOnTop: true,
		    positionClass: 'toast-bottom-left',
		    preventDuplicates: true,
		    preventOpenDuplicates: true,
		    target: 'body'
		    	
		});
		
	}
})();