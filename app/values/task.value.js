//Values for tasks real time exhibition
(function () {
	'use strict';
	angular.module('letsDoIt').value('tasksValue', taskValue());
	
	function taskValue() {
		return {
			finished: [], 
			unfinished: [], 
			loadingFinished: true, 
			loadingUnfinished: true
		};
	}
})();