(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("HomeCtrl", ['TaskService', 'StateService', HomeCtrl]);

    function HomeCtrl(TaskService, StateService) {
        var vm = this;
        vm.title = "Welcome to Let's Do It";

        vm.developers = [{
                "icon" : "person_outline",
                "name": "Breno Wruck Schneider",
                "githubAddress": "https://github.com/brenowschneider",
                "developerPortfolioAddress": "http://www.brenoschneider.info"
            },
            {
                "icon" : "person_outline",
                "name": "Ygor Kiefer",
                "githubAddress": "https://github.com/llKieferll",
                "developerPortfolioAddress": "http://www.ygorkiefer.info"
            }
        ]
    }
}());