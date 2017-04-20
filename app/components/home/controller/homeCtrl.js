(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("HomeCtrl",['TaskService', '$state', HomeCtrl]);

    function HomeCtrl(TaskService, $state) {
        var vm = this;
        vm.title = "HOME";
        TaskService.ping()
	    	.then(function () {/*API is online and doing well!*/})
	    	.catch(function (err) {$state.go('main.connectionProblem');});
    }
}());
