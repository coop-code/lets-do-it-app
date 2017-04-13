(function () {
	"use strict";
	angular
		.module('letsDoIt')
		.config(function(toastrConfig) {
			  angular.extend(toastrConfig, {
			    autoDismiss: false,
			    containerId: 'toast-container',
			    maxOpened: 1,    
			    newestOnTop: true,
			    positionClass: 'toast-top-center',
			    preventDuplicates: true,
			    preventOpenDuplicates: true,
			    target: 'body'
			  });
			});
	 })();