//StateProvider configuration
(function () {
	'use strict';
	angular.module('letsDoIt').config(stateConfig);
	
	stateConfig.$inject = ['$stateProvider'];
	
	function stateConfig($stateProvider) {

        $stateProvider
            .state('main', { //Abstract state in order to define child states. A layout template is used and it contains a ui-view that child states will use to insert their own templates..
                abstract: true,
                url: '/main',
                templateUrl: 'app/layout/view/layout.view.html',
                controller: 'LayoutController as vm'
            })
            .state('main.home', { //Home
                url: '/home',
                templateUrl: 'app/home/view/home.view.html',
                controller: 'HomeController as vm'
            })
            .state('main.finished', { //Finished tasks
                url: '/tasks/finished',
                templateUrl: 'app/tasks/view/finished-tasks.view.html',
                controller: 'FinishedTasksController as vm'
            })
            .state('main.unfinished', { //Unfinished tasks
                url: '/tasks/unfinished',
                templateUrl: 'app/tasks/view/unfinished-tasks.view.html',
                controller: 'UnfinishedTasksController as vm'
            })
            .state('main.connectionProblem', { //Connection problem (API is offline)
                url: '/connectionProblem',
                templateUrl: 'app/connectionProblem/view/connection-problem.view.html',
                controller: 'ConnectionProblemController as vm'
            })
            
     }
})();