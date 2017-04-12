(function () {
	"use strict";
	angular
		.module('letsDoIt')
		.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('darkTheme')
		       	.primaryPalette('grey',{'default': '900'})
		       	.accentPalette('grey',{'default': '700'})
				.dark();
				
			$mdThemingProvider.theme('default');
			
			$mdThemingProvider.setDefaultTheme('darkTheme');

		});
})();