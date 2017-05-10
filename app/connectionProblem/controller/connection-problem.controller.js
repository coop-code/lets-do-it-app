(function () {
    'use strict';
    angular
        .module('letsDoIt')
        .controller('ConnectionProblemController', [ConnectionProblemController]);

    function ConnectionProblemController() {
        var vm = this;
        vm.title = 'Connection Problem';
        vm.apiRepository = 'https://github.com/coop-code/lets-do-it-api'
    }
}());