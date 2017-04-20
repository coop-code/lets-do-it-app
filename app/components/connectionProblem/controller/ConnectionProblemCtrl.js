(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("ConnectionProblemCtrl", [ConnectionProblemCtrl]);

    function ConnectionProblemCtrl() {
        var vm = this;
        vm.title = "Connection Problem";
        vm.apiRepository = 'https://github.com/coop-code/lets-do-it-api'
        
        vm.message = `The backend server is offline. This web app needs a API to provide data manipulation operations. 
                      If you already implemented one, start it. But if not, there's no need to panic. We have a solution ready for you.`;
        vm.message2 = `There's a Node JS RESTful API called lets-do-it-api that provides the resources you need. Go to`
        vm.message3 = `and download this solution. After you download it, just run "npm start", after that set the API URL in the TaskService.js and then, you're good to go.`
    }

    /*
    <md-toolbar class="md-primary">
            <md-icon>error_outline</md-icon> Untitled document
            <md-icon>error_outline</md-icon>
        </md-toolbar>
     */
}());