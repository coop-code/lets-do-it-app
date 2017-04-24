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
        
		function openDeleteConfirmationDialog(event) {
            var dialogConfig = {
            	templateUrl: 'app/components/dialog/view/deleteConfirmationDialogView.html',
				controller: 'DeleteConfirmationDialogCtrl',
				controllerAs: 'vm',
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
			openDeleteConfirmationDialog: openDeleteConfirmationDialog,
			closeDialog: closeDialog,
			answerDialog: answerDialog
		}
	}
}());