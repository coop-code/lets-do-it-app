(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("LayoutCtrl",
                    LayoutCtrl);

    function LayoutCtrl() {
        var vm = this;
        vm.variable = "Layout variable";
        
        vm.option1 = "Home";
        vm.option2 = "Tasks";
        vm.option3 = "Finished";
        
        vm.unfinished = 2; //This should be provided from a service
        vm.finished = 2;  //This should be provided from a service
    }
}());
