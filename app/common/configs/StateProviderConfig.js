(function () {
	"use strict";
	angular
		.module('letsDoIt')
		.config(["$stateProvider",
        "$urlRouterProvider",
        "$compileProvider",
        "$mdDateLocaleProvider",
        function ($stateProvider, $urlRouterProvider, $compileProvider, $mdDateLocaleProvider) {

            $compileProvider.preAssignBindingsEnabled(true);

            $mdDateLocaleProvider.formatDate = function (date) {
                return date ? moment(date).format('LL') : '';
            }

            $mdDateLocaleProvider.parseDate = function (dateString) {
                var m = moment(dateString, 'LL', true);
                return m.isValid ? m.toDate() : new Date(NaN);
            }

            $urlRouterProvider.otherwise("/main/home");

            $stateProvider
                .state("main", {
                    abstract: true,
                    url: "/main",
                    templateUrl: "app/components/layout/view/layoutView.html",
                    controller: "LayoutCtrl as vm"
                })
                .state("main.home", {
                    url: "/home",
                    templateUrl: "app/components/home/view/homeView.html",
                    controller: "HomeCtrl as vm"
                })
                .state("main.finished", {
                    url: "/tasks/finished",
                    templateUrl: "app/components/tasks/view/finishedTasksView.html",
                    controller: "FinishedTasksListCtrl as vm"
                })
                .state("main.unfinished", {
                    url: "/tasks/unfinished",
                    templateUrl: "app/components/tasks/view/unfinishedTasksView.html",
                    controller: "UnfinishedTasksListCtrl as vm"
                })
                .state("main.connectionProblem", {
                    url: '/connectionProblem',
                    templateUrl: 'app/components/connectionProblem/view/connectionProblemView.html',
                    controller: 'ConnectionProblemCtrl as vm'
                })
         }
    ]);
})();