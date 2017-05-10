//Controller for home.view.html
(function () {
    'use strict';
    angular.module('letsDoIt').controller('HomeController', HomeController);

    function HomeController() {
        var vm = this;
        vm.title = 'Welcome to Let\'s Do It';

        vm.developers = [{
                'icon' : 'person',
                'name': 'Breno Wruck Schneider',
                'githubAddress': 'https://github.com/brenowschneider',
                'developerPortfolioAddress': 'http://www.brenoschneider.info'
            },
            {
                'icon' : 'person',
                'name': 'Ygor Kiefer',
                'githubAddress': 'https://github.com/llKieferll',
                'developerPortfolioAddress': 'http://www.ygorkiefer.info'
            }
        ]
    }
}());