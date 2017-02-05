(function () {
    "use strict";
    var app = angular.module("letsDoIt", ["ui.router"]);
    
    app.config(["$stateProvider",
            "$urlRouterProvider",
            function ($stateProvider, $urlRouterProvider) {
                $urlRouterProvider.otherwise("/");
                $stateProvider
                    .state("main", {
                        url: "/",
                        views: {
                        	'nav': {
                        		templateUrl: "app/home/view/navView.html",
                                controller: "NavCtrl as vm"
                        	},
                        	'content': {
                        		templateUrl: "app/home/view/homeView.html",
                                controller: "HomeCtrl as vm"
                        	}
                        }
                        
                    })
            }]
    );
}());