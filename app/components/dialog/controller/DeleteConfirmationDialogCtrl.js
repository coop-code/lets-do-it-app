(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("DeleteConfirmationDialogCtrl", ['DialogService', DeleteConfirmationDialogCtrl]);

    function DeleteConfirmationDialogCtrl(DialogService) {
        var vm = this;
        
        function closeDialog() {
            DialogService.closeDialog();
        }

        function answerDialog(answer) {
            DialogService.answerDialog(answer);
        }

        vm.title = "Delete Confirmation";
        vm.question = "Are you sure you want to permanently delete this task?";
        vm.yesText = "Yes";
        vm.noText = "No";
        
        vm.closeDialog = closeDialog;
        vm.answerDialog = answerDialog;
    }
}());