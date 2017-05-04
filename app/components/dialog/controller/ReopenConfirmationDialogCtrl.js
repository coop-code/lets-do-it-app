(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("ReopenConfirmationDialogCtrl", ['DialogService', ReopenConfirmationDialogCtrl]);

    function ReopenConfirmationDialogCtrl(DialogService) {
        var vm = this;
        
        function closeDialog() {
            DialogService.closeDialog();
        }

        function answerDialog(answer) {
            DialogService.answerDialog(answer);
        }

        vm.title = "Reopen Confirmation";
        vm.question = "Are you sure you want to mark this task as unfinished again?";
        vm.yesText = "Yes";
        vm.noText = "No";
        
        vm.closeDialog = closeDialog;
        vm.answerDialog = answerDialog;
    }
}());