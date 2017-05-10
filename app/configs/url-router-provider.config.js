//UrlRouterProvider configuration
(function () {
	'use strict';
	angular
		.module('letsDoIt')
		.config(['$urlRouterProvider', RouterConfig]);
	
	function RouterConfig($urlRouterProvider) {
		
        $urlRouterProvider.otherwise('/main/home'); //Redirecting to hom url in case an invalid url is provided
        
     }
})();