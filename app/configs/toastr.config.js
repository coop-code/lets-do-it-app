//Toastr configuration
(function () {
	'use strict';
	angular.module('letsDoIt').config(ToastrConfig);
	
	ToastrConfig.$inject = ['toastrConfig'];
	
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