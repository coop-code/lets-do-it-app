//Controller for confirmation-dialog.view.html, receiving title and question from callers
(function () {
    'use strict';
    angular.module('letsDoIt').controller('ConfirmationDialogController', ConfirmationDialogController);

    ConfirmationDialogController.$inject = ['dialogService', 'title', 'question'];
    
    function ConfirmationDialogController(dialogService, title, question) {
        var vm = this;
        
        function closeDialog() {
            dialogService.closeDialog();
        }

        function answerDialog(answer) {
            dialogService.answerDialog(answer);
        }

        vm.title = title;
        vm.question = question;
        vm.yesText = 'Yes';
        vm.noText = 'No';
        
        vm.closeDialog = closeDialog;
        vm.answerDialog = answerDialog;
    }
}());