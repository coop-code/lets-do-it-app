(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("HomeCtrl",
                    HomeCtrl);

    function HomeCtrl() {
        var vm = this;
        vm.tasks = [
            {" 	taskId": 1,
                "taskTitle": "Mostrar pro aderbal",
                "taskDescription": "Mostrar pro aderbal que essa bagaça ta funcionando",
                "startDate": "04/01/2017",
                "dueDate": "07/01/2017",
                "endDate": "",
                "done": false,
                "tags": [ "api", "work", "aderbal" ]
            },
            {" 	taskId": 2,
                "taskTitle": "Outra pra mostrar pro aderbal",
                "taskDescription": "Mais uma pra mostrar pro aderbal que essa bagaça ta funcionando",
                "startDate": "04/01/2017",
                "dueDate": "08/01/2017",
                "endDate": "",
                "done": false,
                "tags": [ "api", "work", "aderbal" ]
            }];
        vm.title = "HELLO WORLD!";
    }
}());
