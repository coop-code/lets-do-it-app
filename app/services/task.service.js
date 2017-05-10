(function () {
    'use strict';
    angular
        .module('letsDoIt')
        .factory('taskService', ['tasksValue', '$http', taskService]);

    function taskService(tasksValue, $http) {
    	/*
		The address of the API that provides data manipulation functions
		If you are receiving a connection problem message, you need to start an API.
		The Lets Do It API provides all the functions you need to use APP.
		There are 3 steps to run the API
			1) Clone its repository (https://github.com/coop-code/lets-do-it-api) 
			2) Run 'npm install' to install all dependencies
			3) Run 'npm start' and you are good to go
		
		The API runs locally on PORT 4001, so the complete address is http://localhost:4001
		*/
		var apiHealthCheckUri = 'http://localhost:4001/ping';
        var apiUrl = 'http://localhost:4001/tasks';

        //Check if the API is online. If not, send to error page.
        function ping() {
        	var promise =  $http.get(apiHealthCheckUri);
        	return promise
        		.then(function (response) {/*API is online*/})
        		.catch (function (error) {console.log('taskService error (ping): ', error); throw error;});
        }

        //Set the value of finished tasks
        function setFinishedTasks() {
        	var promise =  $http.get(apiUrl, {
                params: {'finished': true}
            });
        	return promise
        		.then(function (response) {
        			var tasks = response.data;
                    tasks.forEach(function (task) {
                    	CalculateDeadlineInDays(task);
                    	CustomizeTask(task);
                    });
                    tasksValue.finished = tasks;
        		})
        		.catch (function (error) {
        			console.log('taskService error (setFinishedtasksValue): ', error);
        			throw error;
        		});
        }

      //Set the value of unfinished tasks
        function setUnfinishedTasks() {
        	var promise =  $http.get(apiUrl, {
                params: {'finished': false}
            });
        	return promise
        		.then(function (response) {
        			var tasks = response.data;
                    tasks.forEach(function (task) {
                    	CalculateDeadlineInDays(task);
                    	CustomizeTask(task);
                    });
                    tasksValue.unfinished = tasks;
        		})
        		.catch (function (error) {
        			console.log('taskService error (setUnfinishedtasksValue): ', error);
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
        			console.log('taskService error (getTask): ', error);
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
                    tasksValue.unfinished.push(newTask);
        		})
        		.catch (function (error) {
        			console.log('taskService error (getTask): ', error);
        			throw error;
        		});
        }
        
        //Delete a task
        function deleteTask(task) {
        	var promise =  $http.delete(apiUrl + '/' + task.id);
        	return promise
        		.then(function () {
        			var finishedIndex =getObjectPositionInArrayById(task, tasksValue.finished); 		//Check if deleted task is a finished task
        			var unfinishedIndex = getObjectPositionInArrayById(task, tasksValue.unfinished);	//Check if deleted task is an unfinished task
        			if(finishedIndex > -1) {
        				tasksValue.finished.splice(finishedIndex, 1); 
        			}
        			if(unfinishedIndex > -1) {
        				tasksValue.unfinished.splice(unfinishedIndex, 1); 
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (deleteTask): ', error);
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
        			var unfinishedIndex = getObjectPositionInArrayById(task, tasksValue.unfinished);
        			if(unfinishedIndex > -1) {
        				tasksValue.unfinished.splice(unfinishedIndex, 1);
        				task.done=true;
        				tasksValue.finished.push(task);
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (finishTask): ', error);
        			throw error;
        		});
        }
        
      //Finish a task
        function reopenTask(task) {
        	var updatedTask = createUpdatedTaskModel(task);
        	updatedTask.done = false;
            var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
        	return promise
        		.then(function (response) {
        			var finishedIndex = getObjectPositionInArrayById(task, tasksValue.finished);
        			if(finishedIndex > -1) {
        				tasksValue.finished.splice(finishedIndex, 1);
        				task.done=false;
        				tasksValue.unfinished.push(task);
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (reopen Task): ', error);
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
        			var unfinishedIndex = getObjectPositionInArrayById(task, tasksValue.unfinished);
        			if(unfinishedIndex > -1) {
        				task.priority = !task.priority;
                        CustomizeTask(task);
        				tasksValue.unfinished.splice(unfinishedIndex, 1, task);
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (changePriority): ', error);
        			throw error;
        		});
        }
        
        //Save an edited task
        function saveEditedTask(oldTask, newTask) {
	    	var updatedTask = createUpdatedTaskModel(newTask);
	        var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
	    	return promise
	    		.then(function (response) {
	    			var unfinishedIndex = getObjectPositionInArrayById(oldTask, tasksValue.unfinished);
	    			if(unfinishedIndex > -1) {
	    				CalculateDeadlineInDays(newTask)
	    				CustomizeTask(newTask); 
	    				tasksValue.unfinished.splice(unfinishedIndex, 1, newTask);
	    			}
	    		})
	    		.catch (function (error) {
	    			console.log('taskService error (saveEditedTask): ', error);
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
            task.priorityIcon = (task.priority) ? 'star' : 'star_border';
            task.chipClasses = {
            		red: task.deadlineInDays <= 1,
            		orange: task.deadlineInDays >= 2 && task.deadlineInDays <= 4,
            		yellow: task.deadlineInDays >= 5 && task.deadlineInDays <= 7,
            		green: task.deadlineInDays >=8 || task.deadlineInDays == undefined || task.deadlineInDays == null
            };
            task.unfinishedCardClasses = {
            		taskCard: true,
            		red: task.deadlineInDays <= 1,
                	orange: task.deadlineInDays >= 2 && task.deadlineInDays <= 4,
                	yellow: task.deadlineInDays >= 5 && task.deadlineInDays <= 7,
                	green: task.deadlineInDays >=8 || task.deadlineInDays == undefined || task.deadlineInDays == null,
                	showCardOptions: false,
            		priorityTask: task.priority
            };
            task.finishedCardClasses = {
            		taskCard: true,
            		showCardOptions: false,
            		priorityTask: task.priority
            }
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
            reopenTask: reopenTask,
            deleteTask: deleteTask,
            saveEditedTask: saveEditedTask
        }
    }

}());