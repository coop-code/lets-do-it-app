//Service for states
(function () {
	'use strict';
	angular.module('letsDoIt').factory('stateService', stateService);
	
	stateService.$inject = ['$state'];

	function stateService($state) {
		
		function getCurrentState() {
			return $state.current;
		}
		
		function goToState(state) {
			$state.go(state);
		}
		
		function goToHome() {
			goToState('main.home');
		}

		function goToFinishedTasks() {
			goToState('main.finished');
		}
		
		function goToUnfinishedTasks() {
			goToState('main.unfinished');
		}
		
		function goToConnectionProblem() {
			goToState('main.connectionProblem');
		}
		
		//Public calls
        return {
        	getCurrentState: getCurrentState,
        	goToHome: goToHome,
            goToFinishedTasks: goToFinishedTasks,
            goToUnfinishedTasks: goToUnfinishedTasks,
            goToConnectionProblem: goToConnectionProblem
        };
	}
}());