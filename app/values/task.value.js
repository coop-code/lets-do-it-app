(function () {
	'use strict';
	angular
		.module('letsDoIt')
		.value('tasksValue', {finished: [], unfinished: [], loadingFinished: true, loadingUnfinished: true});
})();