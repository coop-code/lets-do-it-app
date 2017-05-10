//Filter to truncate text when a specific number of characters is reached
(function () {
	'use strict';
	angular.module('letsDoIt').filter('maxCharacters', maxCharacters);
	
	function maxCharacters() {
        return function (text, max) {
            if (isNaN(max)) return text; //iIf parameter is not a number, return text
            if (max <= 0) return ''; //If parameter is a negative number, return text
            if (text && text.length <= max) return text; //If text exists but its length is lower than max, return text
            if (text && text.length > max) { //If text exists and its length is bigger than specified max...
            	text = text.substring(0, max); //...get the substring containing the first 'max' chars...
                while(text.charAt(text.length-1) === ' '){//...keep removing spaces going backwards...
                	text = text.substr(0, text.length -1);
                }
                return text + '…'; //...and then add '...' to the end of the resulting string
            }
        };
    }
})();