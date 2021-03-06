//DarkTheme configuration
(function () {
	'use strict';
	angular.module('letsDoIt').config(themeConfig);
	
	themeConfig.$inject = ['$mdThemingProvider']
	
	function themeConfig($mdThemingProvider) {
		
		$mdThemingProvider.theme('darkTheme') //Setting grey colors and applying dark theme
	       	.primaryPalette('grey',{'default': '900'})
	       	.accentPalette('grey',{'default': '700'})
			.dark();
		$mdThemingProvider.setDefaultTheme('darkTheme'); //Setting the created theme as default
		
	}
})();