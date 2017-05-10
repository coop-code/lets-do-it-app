//Service for toastrs
(function () {
    'use strict';
	angular.module('letsDoIt').factory('toastrService', toastrService);
	
	toastrService.$inject = ['toastr'];
	
	function toastrService(toastr) {
		
		//Success toastr
		function success(title, text){
			var config = {
				allowHtml: true,
				tapToDismiss: true,
				timeOut: 2000
			};
			toastr.clear();
            toastr.success(text, title, config);
		}
		
		//Error toastr
		function error(title, text){
			var config =  {
					allowHtml: true,
					tapToDismiss: true,
					timeOut: 0,
					progressBar: true
		        };
			toastr.clear();
            toastr.error(text, title, config);
		}
		
		//Information toastr
		function info(title, text){
			var config = {
					allowHtml: true,
					tapToDismiss: true,
					timeOut: 5000,
					progressBar: true,
					extendedTimeOut: 2000
				};
			toastr.clear();
            toastr.info(text, title, config);
		}
		
		//Default toastr for when an operation is being processed
		function processing(title, text){
			var config = {
					allowHtml: true,
					tapToDismiss: true,
					timeOut: 0,
					progressBar: false
				};
			toastr.clear();
            toastr.info(text, title, config);
		}
		
		//Public calls
	    return {
	        success: success,
	        error: error,
	        info: info,
	        processing: processing
	    }
	}
})();