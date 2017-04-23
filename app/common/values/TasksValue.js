(function () {
	"use strict";
	angular
		.module('letsDoIt')
		.value('TasksValue', {finished: [], unfinished: [], loadingFinished: true, loadingUnfinished: true});
})();