(function () {
	"use strict";
	angular
		.module('truncate', [])
		.filter('numberOfChars', function () {
	        return function (text, numberOfChars) {
	            if (isNaN(chars)) return text;
	            if (chars <= 0) return '';
	            if (text && text.length <= numberOfChars) return text;
	            if (text && text.length > numberOfChars) {
	            	text = text.substring(0, numberOfChars);
	                while(text.charAt(text.length-1) === ' '){
	                	text = text.substr(0, text.length -1);
	                }
	                return text + '…';
	            }
	        };
	    });
})();