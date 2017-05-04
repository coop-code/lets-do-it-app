(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("ConfirmationDialogCtrl", ['DialogService', 'title', 'question', ConfirmationDialogCtrl]);

    function ConfirmationDialogCtrl(DialogService, title, question) {
        var vm = this;
        
        function closeDialog() {
            DialogService.closeDialog();
        }

        function answerDialog(answer) {
            DialogService.answerDialog(answer);
        }

        vm.title = title;
        vm.question = question;
        vm.yesText = "Yes";
        vm.noText = "No";
        
        vm.closeDialog = closeDialog;
        vm.answerDialog = answerDialog;
    }
}());