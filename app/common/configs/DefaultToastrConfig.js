(function () {
	"use strict";
	angular
		.module('letsDoIt')
		.config(function(toastrConfig) {
			  angular.extend(toastrConfig, {
			    autoDismiss: false,
			    containerId: 'toast-container',
			    maxOpened: 3,    
			    newestOnTop: true,
			    positionClass: 'toast-top-center',
			    preventDuplicates: false,
			    preventOpenDuplicates: false,
			    target: 'body'
			  });
			});
	 })();