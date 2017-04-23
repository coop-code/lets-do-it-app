(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("HomeCtrl",['TaskService', 'StateService', HomeCtrl]);

    function HomeCtrl(TaskService, StateService) {
        var vm = this;
        vm.title = "HOME";
        TaskService.ping()
	    	.then(function () {/*API is online and doing well!*/})
	    	.catch(function (err) {StateService.goToConnectionProblem();});
    }
}());
