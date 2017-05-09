(function () {
	"use strict";
	angular
		.module("letsDoIt")
		.factory("DialogService", ['$mdDialog', DialogService]);

	function DialogService($mdDialog) {

		function openDialog($event, config) {
			var defaults = {
				clickOutsideToClose: true,
				targetEvent: $event,
				multiple : true
			}
			return $mdDialog.show(angular.extend(defaults, config));
		}
		
		function openTaskCreationDialog(event) {
            var dialogConfig = {
                templateUrl: 'app/components/dialog/view/taskCreationDialogView.html',
                controller: 'TaskCreationDialogCtrl',
                controllerAs: 'vm',
            }
            return openDialog(event, dialogConfig);
        };
		
        function openTaskVisualizationDialog(task, $event) {
            var dialogConfig = {
                templateUrl: 'app/components/dialog/view/taskVisualizationDialogView.html',
                controller: 'TaskVisualizationDialogCtrl',
                controllerAs: 'vm',
                locals: {
                    task: task
                }
            }
            return openDialog($event, dialogConfig);
        };
        
        function openTaskEditionDialog(task, event) {
            var dialogConfig = {
                templateUrl: 'app/components/dialog/view/taskEditionDialogView.html',
                controller: 'TaskEditionDialogCtrl',
                controllerAs: 'vm',
                locals: {
                    task: task
                }
            }
            return openDialog(event, dialogConfig);
        };
        
        function openCreateConfirmationDialog(event) {
            var dialogConfig = {
            	templateUrl: 'app/components/dialog/view/confirmationDialogView.html',
				controller: 'ConfirmationDialogCtrl',
				controllerAs: 'vm',
				locals: {
                    title: "Create confirmation",
                    question: "Are you sure you want to create this task?"
                },
				clickOutsideToClose: false
            }
            return openDialog(event, dialogConfig);
        };
        
		function openDeleteConfirmationDialog(event) {
            var dialogConfig = {
            	templateUrl: 'app/components/dialog/view/confirmationDialogView.html',
				controller: 'ConfirmationDialogCtrl',
				controllerAs: 'vm',
				locals: {
                    title: "Delete confirmation",
                    question: "Are you sure you want to permanently delete this task?"
                },
				clickOutsideToClose: false
            }
            return openDialog(event, dialogConfig);
        };
        
        function openFinishConfirmationDialog(event) {
            var dialogConfig = {
            		templateUrl: 'app/components/dialog/view/confirmationDialogView.html',
    				controller: 'ConfirmationDialogCtrl',
    				controllerAs: 'vm',
    				locals: {
                        title: "Finish confirmation",
                        question: "Are you sure you want to mark this task as finished?"
                    },
				clickOutsideToClose: false
            }
            return openDialog(event, dialogConfig);
        };
        
        function openReopenConfirmationDialog(event) {
            var dialogConfig = {
            		templateUrl: 'app/components/dialog/view/confirmationDialogView.html',
    				controller: 'ConfirmationDialogCtrl',
    				controllerAs: 'vm',
    				locals: {
                        title: "Delete confirmation",
                        question: "Are you sure you want to reopen this task and mark it as unfinished again?"
                    },
				clickOutsideToClose: false
            }
            return openDialog(event, dialogConfig);
        };

		function closeDialog() {
			$mdDialog.cancel();
		}

		function answerDialog(answer) {
			$mdDialog.hide(answer);
		}

		//Public calls
		return {
			openTaskCreationDialog: openTaskCreationDialog,
			openTaskVisualizationDialog: openTaskVisualizationDialog,
			openTaskEditionDialog: openTaskEditionDialog,
			openCreateConfirmationDialog: openCreateConfirmationDialog,
			openFinishConfirmationDialog: openFinishConfirmationDialog,
			openReopenConfirmationDialog: openReopenConfirmationDialog,
			openDeleteConfirmationDialog: openDeleteConfirmationDialog,
			closeDialog: closeDialog,
			answerDialog: answerDialog
		}
	}
}());