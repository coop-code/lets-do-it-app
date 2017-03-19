(function () {
    "use strict";
    var app = angular.module("letsDoIt", ["ui.router", "ngResource", "ngMaterial"]);
    
    app.config(["$stateProvider",
            "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/main/home");
                $stateProvider
                    .state("main", {
                    	abstract: true,
                        url: "/main",
                        templateUrl: "app/layout/view/layoutView.html",
                        controller: "LayoutCtrl as vm"
                    })
                    .state("main.home", {
                    	url: "/home",
                    	templateUrl: "app/components/home/view/homeView.html",
                        controller: "HomeCtrl as vm"
                    })
                    .state("main.finished", {
                    	url: "/tasks/finished",
                    	templateUrl: "app/components/tasks/views/finishedTasksView.html",
                        controller: "TasksListCtrl as vm"
                    })
                    .state("main.unfinished", {
                    	url: "/tasks/unfinished",
                    	templateUrl: "app/components/tasks/views/unfinishedTasksView.html",
                        controller: "TasksListCtrl as vm"
                    })
            }]
    );
}());