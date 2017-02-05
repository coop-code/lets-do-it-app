(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("NavCtrl",
                    NavCtrl);

    function NavCtrl() {
        var vm = this;
        vm.option1 = "Home";
        vm.option2 = "Tasks";
    }
}());
