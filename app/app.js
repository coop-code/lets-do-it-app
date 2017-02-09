(function () {
    "use strict";
    var app = angular.module("letsDoIt", ["ui.router"]);
    
    app.config(["$stateProvider",
            "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/main");
                $stateProvider
                    .state("main", {
                        url: "/main",
                        views: {
                        	'@': {
                        		templateUrl: "app/layout/view/layoutView.html",
                        		controller: "LayoutCtrl as vm"
                        	},
                        	'home@main': {
                        		templateUrl: "app/components/home/view/homeView.html",
                                controller: "HomeCtrl as vm"
                        	}
                        }
                        
                    })
                    .state("main.finished", {
                    	url: "/tasks/finished",
                    	templateUrl: "app/components/tasks/views/finishedTasksView.html",
                        controller: "TasksCtrl as vm"
                    })
                    .state("main.unfinished", {
                    	url: "/tasks/unfinished",
                    	templateUrl: "app/components/tasks/views/unfinishedTasksView.html",
                        controller: "TasksCtrl as vm"
                    })
            }]
    );
}());