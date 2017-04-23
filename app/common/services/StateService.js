(function () {
	"use strict";
	angular
		.module("letsDoIt")
		.factory("StateService", ['$state', StateService]);

	function StateService($state) {
		function goToHome() {
			$state.go('main.home');
		}

		function goToFinishedTasks() {
			$state.go('main.finished');
		}
		
		function goToUnfinishedTasks() {
			$state.go('main.unfinished');
		}
		
		function goToConnectionProblem() {
			$state.go('main.connectionProblem');
		}

		//Public calls
        return {
        	goToHome: goToHome,
            goToFinishedTasks: goToFinishedTasks,
            goToUnfinishedTasks: goToUnfinishedTasks,
            goToConnectionProblem: goToConnectionProblem
        }
	}
}());