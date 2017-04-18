(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .controller("TaskEditDialogCtrl", ['TaskService', 'ToastrService', '$http', '$state', '$mdDialog', 'finishedTasks', 'unfinishedTasks', 'task', TaskEditDialogCtrl]);

    function TaskEditDialogCtrl(TaskService, ToastrService, $http, $state, $mdDialog, finishedTasks, unfinishedTasks,  task) {
        var vm = this;
        vm.unfinished = unfinishedTasks;

        //This view is a task edit if the tasks passed as parameter is not null
        //Otherwise, it's a task creation view.
        if (task && task.id > 0) {

            //Task Edit or View
            vm.task = task;

            if (task.done) {
                ViewTaskProperties();
            } else {
                EditTaskProperties();
            }

        } else {
            //Task Creation
            //Task model
            vm.task = {
                title: '',
                description: '',
                deadline: undefined,
                comments: '',
                priority: false
            }

            NewTaskProperties();
        }

        //Triggered by the create button
        vm.submit = function () {
            ToastrService.clear();

            if (vm.task.id && vm.task.id > 0) {
                //Task Edit
                ToastrService.processing("Saving", "Please wait while the task is saved...");
                TaskService.save(vm.task)
                    .then(
                        //Success callback
                        function (response) {
                            $mdDialog.hide();
                            ToastrService.clear();
                            ToastrService.success("Task saved successfully!");
                            if ($state.current.name == 'main.unfinished') {
                                $state.reload();
                            };
                        },
                        //Error callback
                        function (err) {
                            ToastrService.clear();
                            ToastrService.error("Error", "Please check if the fields were filled correctly.")
                        }
                    )

            } else {
                //Task Creation
                ToastrService.processing("Creating", "Please wait while the task is created...");
                TaskService.create(vm.task)
                    .then(
                        //Success callback
                        function (response) {
                            $mdDialog.hide();
                            ToastrService.clear();
                            ToastrService.success("Task created successfully!");
                            var model = {
                                    title: response.data.title,
                                    description: response.data.description,
                                    deadline: response.data.deadline,
                                    comments: response.data.comments,
                                    priority: response.data.priority,
                            };
                            CalculateDeadlineInDays(model);
                            CustomizeTask(model);
                            vm.unfinished.push(model);
                            if ($state.current.name == 'main.unfinished') {
                                $state.reload();
                            };
                        },
                        //Error callback
                        function (err) {
                            ToastrService.clear();
                            ToastrService.error("Error", "Please check if the fields were filled correctly.")
                        }
                    )
            }

        }

        vm.close = function () {
            $mdDialog.hide();
        }

        //Triggered by the clear button
        vm.clear = function () {
            vm.task.title = '';
            vm.task.description = '';
            vm.task.deadline = null;
            vm.task.comments = '';
            vm.task.priority = false;
        }

        vm.delete = function (id) {
            ToastrService.clear();
            ToastrService.processing("Deleting", "Please wait while the task is deleted...");
            TaskService.delete(id)
                .then(
                    //Success callback
                    function (response) {
                        $mdDialog.hide();
                        ToastrService.clear();
                        ToastrService.success("Task deleted successfully!");
                        $mdDialog.hide();
                        if ($state.current.name == 'main.unfinished' || $state.current.name == 'main.finished') {
                            $state.reload();
                        };
                    },
                    //Error callback
                    function (err) {
                        ToastrService.clear();
                        ToastrService.error("Error", "There was a problem with the delete operation. Please try again later.")
                    }
                )
        }


        //User clicked on the add button to create a task
        function NewTaskProperties() {

            vm.title = "New Task";

            vm.clearButtonVisible = true;
            vm.deleteButtonVisible = false;
            vm.saveOrCreateButtonVisible = true;

            vm.operation = "Save";
            vm.operationIcon = "save";

            MakeFieldsEditable();

        }

        //User clicked on the task in the unfinished tasks list
        function EditTaskProperties() {

            vm.title = "Task Details (edit)";

            vm.clearButtonVisible = false;
            vm.deleteButtonVisible = true;
            vm.saveOrCreateButtonVisible = true;

            vm.operation = "Save";
            vm.operationIcon = "save";

            MakeFieldsEditable();
        }

        //User clicked on the task in the finished tasks list
        function ViewTaskProperties() {

            vm.title = "Task Details (view)";

            vm.clearButtonVisible = false;
            vm.deleteButtonVisible = true;
            vm.saveOrCreateButtonVisible = false;

            MakeFieldsReadOnly();

        }

        //Task creation and edit : fields are all editable
        function MakeFieldsEditable() {
            vm.titleReadOnly = false;
            //md-datepicker does not support ng-readonly
            vm.deadlineDisabled = false;
            vm.descriptionReadOnly = false;
            vm.commentsReadOnly = false;
            vm.priorityReadOnly = false;
        }

        //Finished tasks can not be edited (only deleted)
        function MakeFieldsReadOnly() {
            vm.titleReadOnly = true;
            //md-datepicker does not support ng-readonly
            vm.deadlineDisabled = true;
            vm.descriptionReadOnly = true;
            vm.commentsReadOnly = true;
            vm.priorityReadOnly = true;
        }
        
        function CalculateDeadlineInDays(task) {

            var days;

            if (task.deadline) {

                task.deadline = new Date(task.deadline);
                var timeDiff = task.deadline.getTime() - Date.now();
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                task.deadlineInDays = diffDays;

            }
        }

        function CustomizeTask(task) {
            task["showOptions"] = false;
            task.priorityIcon = CustomizePriorityIcon(task.priority);
        }

        function CustomizePriorityIcon(priority) {
            if (priority) {
                return "star";
            }
            return "star_border";
        }
    }
}());