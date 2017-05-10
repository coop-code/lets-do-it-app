(function () {
	'use strict';
	angular
		.module('letsDoIt')
		.filter('maxCharacters', function () {
	        return function (text, max) {
	            if (isNaN(max)) return text;
	            if (max <= 0) return '';
	            if (text && text.length <= max) return text;
	            if (text && text.length > max) {
	            	text = text.substring(0, max);
	                while(text.charAt(text.length-1) === ' '){
	                	text = text.substr(0, text.length -1);
	                }
	                return text + '…';
	            }
	        };
	    });
})();