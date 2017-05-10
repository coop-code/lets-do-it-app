(function () {
    'use strict';
	angular.module('letsDoIt')
		.factory('toastrService', ['toastr', toastrService]);
	
	function toastrService(toastr) {
		
		function success(title, text){
			var config = {
				allowHtml: true,
				tapToDismiss: true,
				timeOut: 2000
			};
			toastr.clear();
            toastr.success(text, title, config);
		}
		
		function success(title, text){
			var config = {
				allowHtml: true,
				tapToDismiss: true,
				timeOut: 2000
			};
			toastr.clear();
            toastr.success(text, title, config);
		}
		
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