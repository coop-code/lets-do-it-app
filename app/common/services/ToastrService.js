(function () {
    "use strict";
	angular.module('letsDoIt')
		.factory('ToastrService', function (toastr) {
			
			var successConfig = {
				allowHtml: true,
				tapToDismiss: true,
				timeOut: 5000
			};
			
			var errorConfig =  {
				allowHtml: true,
				tapToDismiss: true,
				timeOut: 10000,
				progressBar: true,
				extendedTimeOut: 5000
	        };
			
			var infoConfig = {
				allowHtml: true,
				tapToDismiss: true,
				timeOut: 10000,
				progressBar: true,
				extendedTimeOut: 2000
			};
			
			var processingConfig = {
				allowHtml: true,
				tapToDismiss: true,
				timeOut: 0,
				progressBar: false,
			};
			
		    return {
		        success: function (title, text) {
		            toastr.success(text ,  title , successConfig);
		        },
		        error: function (title, text) {
		        	 toastr.error(text ,  title , errorConfig);
		        },
		        info: function (title, text) {
		        	toastr.info(text , title , infoConfig);
		        },
		        processing: function (title, text) {
		        	 toastr.info(text, title, processingConfig);
		        },
		        clear: function () {
		        	 toastr.clear();
		        }
		    }
		});
	})();