//UrlRouterProvider configuration
(function () {
	'use strict';
	angular.module('letsDoIt').config(routerConfig);
	
	routerConfig.$inject = ['$urlRouterProvider'];
	
	function routerConfig($urlRouterProvider) {
		
        $urlRouterProvider.otherwise('/main/home'); //Redirecting to home URL in case an invalid URL is provided
        
     }
})();