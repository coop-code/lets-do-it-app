(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("HomeCtrl",
        		HomeCtrl);

    function HomeCtrl() {
        var vm = this;
        vm.title = "HOME";
    }
}());
