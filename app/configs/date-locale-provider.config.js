//DateLocaleProvider configuration
(function () {
	'use strict';
	angular.module('letsDoIt').config(DateConfig);
	
	DateConfig.$inject = ['$mdDateLocaleProvider'];
	
	function DateConfig($mdDateLocaleProvider) {

        $mdDateLocaleProvider.formatDate = function (date) {
            return date ? moment(date).format('LL') : ''; //Formatting dates as '<month> <day>, <year>' (for example, 'May 16, 2017'
        }
        
     }
})();