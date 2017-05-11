//Service for dialogs
(function () {
	'use strict';
	angular.module('letsDoIt').factory('dialogService', dialogService);
	
	dialogService.$inject = ['$mdDialog'];

	function dialogService($mdDialog) {

		//Function to open a dialog with a given config
		function openDialog($event, config) {
			var defaults = {
				clickOutsideToClose: true,
				targetEvent: $event,
				multiple : true
			}
			return $mdDialog.show(angular.extend(defaults, config)); //extends the default configuration, adding 'config' to it
		}
		
		//Properties of the Task Creation Dialog
        function openTaskCreationDialog(event) {
            var dialogConfig = {
                templateUrl: 'app/dialog/view/task-creation-dialog.view.html',
                controller: 'TaskCreationDialogController',
                controllerAs: 'vm',
            };
            return openDialog(event, dialogConfig);
        }
		
        //Properties of the Task Visualization Dialog
        function openTaskVisualizationDialog(task, $event) {
            var dialogConfig = {
                templateUrl: 'app/dialog/view/task-visualization-dialog.view.html',
                controller: 'TaskVisualizationDialogController',
                controllerAs: 'vm',
                locals: {
                    task: task
                }
            };
            return openDialog($event, dialogConfig);
        }
        
        //Properties of the Task Edit Dialog 
        function openTaskEditionDialog(task, event) {
            var dialogConfig = {
                templateUrl: 'app/dialog/view/task-edition-dialog.view.html',
                controller: 'TaskEditionDialogController',
                controllerAs: 'vm',
                locals: {
                    task: task
                }
            };
            return openDialog(event, dialogConfig);
        }
        
        //Properties of the Task Confirmation Dialog (when creating a task)
        function openCreateConfirmationDialog(event) {
            var dialogConfig = {
            	templateUrl: 'app/dialog/view/confirmation-dialog.view.html',
				controller: 'ConfirmationDialogController',
				controllerAs: 'vm',
				locals: {
                    title: 'Create confirmation',
                    question: 'Are you sure you want to create this task?'
                },
				clickOutsideToClose: false
            };
            return openDialog(event, dialogConfig);
        }
        
        //Properties of the Task Confirmation Dialog (when deleting a task)
		function openDeleteConfirmationDialog(event) {
            var dialogConfig = {
            	templateUrl: 'app/dialog/view/confirmation-dialog.view.html',
				controller: 'ConfirmationDialogController',
				controllerAs: 'vm',
				locals: {
                    title: 'Delete confirmation',
                    question: 'Are you sure you want to permanently delete this task?'
                },
				clickOutsideToClose: false
            };
            return openDialog(event, dialogConfig);
        }
        
        //Properties of the Task Confirmation Dialog (when marking a task as done or finished)
        function openFinishConfirmationDialog(event) {
            var dialogConfig = {
            		templateUrl: 'app/dialog/view/confirmation-dialog.view.html',
    				controller: 'ConfirmationDialogController',
    				controllerAs: 'vm',
    				locals: {
                        title: 'Finish confirmation',
                        question: 'Are you sure you want to mark this task as finished?'
                    },
				clickOutsideToClose: false
            };
            return openDialog(event, dialogConfig);
        }
        
        //Properties of the Task Confirmation Dialog (when saving a task after editing)
        function openEditConfirmationDialog(event) {
            var dialogConfig = {
            	templateUrl: 'app/dialog/view/confirmation-dialog.view.html',
				controller: 'ConfirmationDialogController',
				controllerAs: 'vm',
				locals: {
                    title: 'Edit confirmation',
                    question: 'Are you sure you want to save the editions made to this task?'
                },
				clickOutsideToClose: false
            };
            return openDialog(event, dialogConfig);
        }
        
        //Properties of the Task Confirmation Dialog (when marking a finished task as unfinished)
        function openReopenConfirmationDialog(event) {
            var dialogConfig = {
            		templateUrl: 'app/dialog/view/confirmation-dialog.view.html',
    				controller: 'ConfirmationDialogController',
    				controllerAs: 'vm',
    				locals: {
                        title: 'Delete confirmation',
                        question: 'Are you sure you want to reopen this task and mark it as unfinished again?'
                    },
				clickOutsideToClose: false
            };
            return openDialog(event, dialogConfig);
        }

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
			openEditConfirmationDialog: openEditConfirmationDialog,
			openReopenConfirmationDialog: openReopenConfirmationDialog,
			openDeleteConfirmationDialog: openDeleteConfirmationDialog,
			closeDialog: closeDialog,
			answerDialog: answerDialog
		};
	}
}());