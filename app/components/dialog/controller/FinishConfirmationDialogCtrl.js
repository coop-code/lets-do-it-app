(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("FinishConfirmationDialogCtrl", ['DialogService', FinishConfirmationDialogCtrl]);

    function FinishConfirmationDialogCtrl(DialogService) {
        var vm = this;
        
        function closeDialog() {
            DialogService.closeDialog();
        }

        function answerDialog(answer) {
            DialogService.answerDialog(answer);
        }

        vm.title = "Finish Confirmation";
        vm.question = "Are you sure you want to permanently mark this task as finished?";
        vm.yesText = "Yes";
        vm.noText = "No";
        
        vm.closeDialog = closeDialog;
        vm.answerDialog = answerDialog;
    }
}());