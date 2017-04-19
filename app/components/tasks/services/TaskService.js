(function () {
    "use strict";
    angular
        .module("letsDoIt")
        .factory("TaskService",
            ['TasksValue', '$http', TaskService]);

    function TaskService(TasksValue, $http) {
        //The API runs locally for now. 
        var apiHealthCheckUri = 'http://localhost:4000/ping';
        var apiUrl = 'http://localhost:4000/tasks';

        function setUnfinishedTasksValue() {
        	var promise =  $http.get(apiUrl, {
                params: {
                    "finished": false
                }
            });
        	return promise
        		.then(function (response) {
        			var tasks = response.data;
                    tasks.forEach(function (task) {
                    	CalculateDeadlineInDays(task);
                    	CustomizeTask(task);
                    });
                    TasksValue.unfinished = tasks;
        		})
        		.catch (function (error) {
        			console.log('TaskService error (setUnfinishedTasksValue): ', error);
        		});
        }
        
        function getUnfinishedTasksValue() {
        	return TasksValue.unfinished;
        }
        
        function setFinishedTasksValue() {
        	var promise =  $http.get(apiUrl, {
                params: {
                    "finished": true
                }
            });
        	return promise
        		.then(function (response) {
        			var tasks = response.data;
                    tasks.forEach(function (task) {
                    	CalculateDeadlineInDays(task);
                    	CustomizeTask(task);
                    });
                    TasksValue.finished = tasks;
        		})
        		.catch (function (error) {
        			console.log('TaskService error (setFinishedTasksValue): ', error);
        		});
        }
        
        function getFinishedTasksValue() {
        	return TasksValue.finished;
        }

        function getTask(id) {
        	var promise =  $http.get(apiUrl + '/' + id);
        	return promise
        		.then(function (response) {
        			var task = response.data;
                    	CalculateDeadlineInDays(task);
                    	CustomizeTask(task);
                    return tasks;
        		})
        		.catch (function (error) {
        			console.log('TaskService error (getTask): ', error);
        		});
        }
        
        function createTask(task) {
        	var promise =  $http.post(apiUrl, task);
        	return promise
        		.then(function (response) {
        			var newTask= response.data;
                    CalculateDeadlineInDays(newTask);
                    CustomizeTask(newTask);
                    TasksValue.unfinished.push(newTask);
        		})
        		.catch (function (error) {
        			console.log('TaskService error (getTask): ', error);
        		});
        }
        
        function deleteTask(task) {
        	var promise =  $http.delete(apiUrl + '/' + task.id);
        	return promise
        		.then(function (response) {
        			
        			var finishedIndex = TasksValue.finished.indexOf(task);
        			var unfinishedIndex = TasksValue.unfinished.indexOf(task);

        			if(finishedIndex > -1) TasksValue.finished.splice(finishedIndex, 1);
        			if(unfinishedIndex > -1) TasksValue.unfinished.splice(unfinishedIndex, 1);
        		})
        		.catch (function (error) {
        			console.log('TaskService error (deleteTask): ', error);
        		});
        }
        
        return {
            ping: function () {
                return $http.get(apiHealthCheckUri);
            },
            setUnfinishedTasks: function () {
            	return setUnfinishedTasksValue();
            },
            setFinishedTasks: function () {
            	return setFinishedTasksValue();
            },
            get: function (id) {
                return getTask(id);
            },

            create: function (taskDto) {
                return createTask(taskDto);
            },

            save: function (task) {
                var updateTaskDto = prepareTaskForUpdate(task);
                return $http.put(apiUrl + '/' + updateTaskDto.id, updateTaskDto);
            },
            finish: function (id) {
                return $http.put(apiUrl + '/' + id + '/finish', null);
            },
            deleteTask: function (task) {
                return deleteTask(task);
            }
        }

        function prepareTaskForUpdate(task) {
            var updateTaskDto = {}
            updateTaskDto.id = task.id;
            updateTaskDto.title = task.title;
            updateTaskDto.deadline = task.deadline;
            updateTaskDto.description = task.description;
            updateTaskDto.comments = task.comments;
            updateTaskDto.priority = task.priority;
            updateTaskDto.done = task.done;

            return updateTaskDto;

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