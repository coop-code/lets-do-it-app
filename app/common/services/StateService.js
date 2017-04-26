(function () {
	"use strict";
	angular
		.module("letsDoIt")
		.factory("StateService", ['$state', StateService]);

	function StateService($state) {
		
		function goToState(state) {
			$state.go(state);
		}
		
		function goToHome() {
			$state.goToState('main.home');
		}

		function goToFinishedTasks() {
			$state.goToState('main.finished');
		}
		
		function goToUnfinishedTasks() {
			$state.goToState('main.unfinished');
		}
		
		function goToConnectionProblem() {
			$state.goToState('main.connectionProblem');
		}

		//Public calls
        return {
        	goToState: goToState,
        	goToHome: goToHome,
            goToFinishedTasks: goToFinishedTasks,
            goToUnfinishedTasks: goToUnfinishedTasks,
            goToConnectionProblem: goToConnectionProblem
        }
	}
}());