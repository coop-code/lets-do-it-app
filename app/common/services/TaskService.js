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

        //Check if the API is online. If not, send to error page.
        function ping() {
        	var promise =  $http.get(apiHealthCheckUri);
        	return promise
        		.then(function (response) {/*API is online*/})
        		.catch (function (error) {console.log('TaskService error (ping): ', error); throw error;});
        }

        //Set the value of finished tasks
        function setFinishedTasks() {
        	var promise =  $http.get(apiUrl, {
                params: {"finished": true}
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
        			throw error;
        		});
        }

      //Set the value of unfinished tasks
        function setUnfinishedTasks() {
        	var promise =  $http.get(apiUrl, {
                params: {"finished": false}
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
        			throw error;
        		});
        }
        
        //Get a task by its id
        function getTask(task) {
        	var promise =  $http.get(apiUrl + '/' + task.id);
        	return promise
        		.then(function (response) {
        			var taskRetrieved = response.data;
                    CalculateDeadlineInDays(taskRetrieved);
                    CustomizeTask(taskRetrieved);
                    return taskRetrieved;
        		})
        		.catch (function (error) {
        			console.log('TaskService error (getTask): ', error);
        			throw error;
        		});
        }
        
        //Create a new task
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
        			throw error;
        		});
        }
        
        //Delete a task
        function deleteTask(task) {
        	var promise =  $http.delete(apiUrl + '/' + task.id);
        	return promise
        		.then(function () {
        			var finishedIndex =getObjectPositionInArrayById(task, TasksValue.finished); 		//Check if deleted task is a finished task
        			var unfinishedIndex = getObjectPositionInArrayById(task, TasksValue.unfinished);	//Check if deleted task is an unfinished task
        			if(finishedIndex > -1) {
        				TasksValue.finished.splice(finishedIndex, 1); 
        			}
        			if(unfinishedIndex > -1) {
        				TasksValue.unfinished.splice(unfinishedIndex, 1); 
        			}
        		})
        		.catch (function (error) {
        			console.log('TaskService error (deleteTask): ', error);
        			throw error;
        		});
        }
   
        //Finish a task
        function finishTask(task) {
        	var updatedTask = createUpdatedTaskModel(task);
        	updatedTask.done = true;
            var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
        	return promise
        		.then(function (response) {
        			var unfinishedIndex = getObjectPositionInArrayById(task, TasksValue.unfinished);
        			if(unfinishedIndex > -1) {
        				TasksValue.unfinished.splice(unfinishedIndex, 1);
        				task.done=true;
        				TasksValue.finished.push(task);
        			}
        		})
        		.catch (function (error) {
        			console.log('TaskService error (finishTask): ', error);
        			throw error;
        		});
        }
        
        //Toggle the priority of a task
        function changeTaskPriority(task) {
        	var updatedTask = createUpdatedTaskModel(task);
        	updatedTask.priority = !updatedTask.priority;
            var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
        	return promise
        		.then(function (response) {
        			var unfinishedIndex = getObjectPositionInArrayById(task, TasksValue.unfinished);
        			if(unfinishedIndex > -1) {
        				task.priority = !task.priority;
                        CustomizeTask(task);
        				TasksValue.unfinished.splice(unfinishedIndex, 1, task);
        			}
        		})
        		.catch (function (error) {
        			console.log('TaskService error (changePriority): ', error);
        			throw error;
        		});
        }
        
        //Save an edited task
        function saveEditedTask(oldTask, newTask) {
	    	var updatedTask = createUpdatedTaskModel(newTask);
	        var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
	    	return promise
	    		.then(function (response) {
	    			var unfinishedIndex = getObjectPositionInArrayById(oldTask, TasksValue.unfinished);
	    			if(unfinishedIndex > -1) {
	    				CustomizeTask(newTask); 
	    				TasksValue.unfinished.splice(unfinishedIndex, 1, newTask);
	    			}
	    		})
	    		.catch (function (error) {
	    			console.log('TaskService error (saveEditedTask): ', error);
	    			throw error;
	    		});
        }

        //Prepare a task to be inserted in DB based on provided parameter 'task', getting only the necessary fields
        function createUpdatedTaskModel(task) {
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
        
        //Get an object index in an array, returning -1 if it doesn't exist
        function getObjectPositionInArrayById (object, array) {
        	return array.map(function(e) { return e.id; }).indexOf(object.id);
        }
        
        //Calculate deadline in days
        function CalculateDeadlineInDays(task) {
            var days;
            if (task.deadline) {
                task.deadline = new Date(task.deadline);
                var timeDiff = task.deadline.getTime() - Date.now();
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                task.deadlineInDays = diffDays;
            }
        }

        //Add the 'showOptions' parameter to be used to open and close card options and set the priority icon according to priority value
        function CustomizeTask(task) {
            task.showOptions = false;
            task.priorityIcon = (task.priority) ? "star" : "star_border";
        }
        
        //Public calls
        return {
            ping: ping,
            setUnfinishedTasks: setUnfinishedTasks,
            setFinishedTasks: setFinishedTasks,
            getTask: getTask,
            createTask: createTask,
            changeTaskPriority: changeTaskPriority,
            finishTask: finishTask,
            deleteTask: deleteTask,
            saveEditedTask: saveEditedTask
        }
    }

}());