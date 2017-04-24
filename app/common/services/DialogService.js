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

		function closeDialog() {
			$mdDialog.cancel();
		}

		function answerDialog(answer) {
			$mdDialog.hide(answer);
		}

		return {
			openDialog: function (event, config) {
				return openDialog(event, config);
			},
			closeDialog: function () {
				closeDialog();
			},
			answerDialog: function (answer) {
				answerDialog(answer);
			}
		}
	}
}());