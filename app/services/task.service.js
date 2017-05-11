//Service for tasks
(function () {
    'use strict';
    angular.module('letsDoIt').factory('taskService', taskService);
    
    taskService.$inject = ['tasksValue', '$http'];

    function taskService(tasksValue, $http) {
    	/*
		If you are receiving a connection problem message, you need to start a backend server (an API).
		The Let's Do It API provides all the functions you need to use this APP and 
		runs locally on PORT 4001, so the complete address is http://localhost:4001
		This APP is configured to interact with the Let's Do It API as default.
		*/
    	
		var apiHealthCheckUri = 'http://localhost:4001/ping';
        var apiUrl = 'http://localhost:4001/tasks';

        //Check if the API is online. If not, send to error page.
        function ping() {
        	var promise =  $http.get(apiHealthCheckUri);
        	return promise
        		.then(function (response) {
        			/*API is online*/
        		})
        		.catch (function (error) {
        			console.log('taskService error (ping): ', error); 
        			throw error;
        		});
        }

        //Set the value of finished tasks on task.value.js
        function setFinishedTasks() {
        	var promise =  $http.get(apiUrl, {
                params: {'finished': true}
            });
        	return promise
        		.then(function (response) {
        			var tasks = response.data;
                    tasks.forEach(function (task) {
                    	CalculateDeadlineInDays(task); //Convert deadline time to days
                    	CustomizeTask(task); //Customize received tasks for exhibition
                    });
                    tasksValue.finished = tasks; //Set finished tasks
        		})
        		.catch (function (error) {
        			console.log('taskService error (setFinishedtasksValue): ', error);
        			throw error;
        		});
        }

      //Set the value of unfinished tasks on task.value.js
        function setUnfinishedTasks() {
        	var promise =  $http.get(apiUrl, {
                params: {'finished': false}
            });
        	return promise
        		.then(function (response) {
        			var tasks = response.data;
                    tasks.forEach(function (task) {
                    	CalculateDeadlineInDays(task); //Convert deadline time to days
                    	CustomizeTask(task); //Customize received tasks for exhibition
                    });
                    tasksValue.unfinished = tasks; //Set unfinished tasks
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
                    CalculateDeadlineInDays(taskRetrieved); //Convert deadline time to days
                    CustomizeTask(taskRetrieved); //Customize received tasks for exhibition
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
        		.then(function (response) { //Successful create
        			var newTask= response.data;
                    CalculateDeadlineInDays(newTask); //Convert deadline time to days
                    CustomizeTask(newTask); //Customize received tasks for exhibition
                    tasksValue.unfinished.push(newTask); //Insert new task in unfinished array, so unfinished-tasks.view.html is updated immediately
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
        		.then(function () { //Successful delete
        			var finishedIndex =getObjectPositionInArrayById(task, tasksValue.finished); //Check if deleted task is a finished task
        			var unfinishedIndex = getObjectPositionInArrayById(task, tasksValue.unfinished); //Check if deleted task is an unfinished task
        			if(finishedIndex > -1) { //If it is a finished task
        				tasksValue.finished.splice(finishedIndex, 1); //Remove it from finished array, so finished-tasks.view.html is updated immediately
        			}
        			if(unfinishedIndex > -1) { //If it is an unfinished task
        				tasksValue.unfinished.splice(unfinishedIndex, 1); //Remove it from unfinished array, so unfinished-tasks.view.html is updated immediately
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (deleteTask): ', error);
        			throw error;
        		});
        }
   
        //Finish a task
        function finishTask(task) {
        	var updatedTask = createUpdatedTaskModel(task); //Create task model to be inserted or updated in the database (without all the customized gizmos)
        	updatedTask.done = true;
            var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
        	return promise
        		.then(function (response) { //Successful finish
        			var unfinishedIndex = getObjectPositionInArrayById(task, tasksValue.unfinished); //Get the position of the task that was finished
        			if(unfinishedIndex > -1) { //If it exists (just in case)
        				tasksValue.unfinished.splice(unfinishedIndex, 1); //Remove it from unfinished array, so unfinished-tasks.view.html is updated immediately
        				task.done=true; //Mark the task as finished
        				tasksValue.finished.push(task); //And insert it in the finished array, so finished-tasks.view.html is updated immediately
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (finishTask): ', error);
        			throw error;
        		});
        }
        
        //Reopen a task
        function reopenTask(task) {
        	var updatedTask = createUpdatedTaskModel(task); //Create task model to be inserted or updated in the database (without all the customized gizmos)
        	updatedTask.done = false;
            var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
        	return promise
        		.then(function (response) { //Successful reopen
        			var finishedIndex = getObjectPositionInArrayById(task, tasksValue.finished); //Get the position of the task that was reopened
        			if(finishedIndex > -1) { //If it exists (just in case)
        				tasksValue.finished.splice(finishedIndex, 1); //Remove it from finished array, so unfinished-tasks.view.html is updated immediately
        				task.done=false; //Mark the task as unfinished
        				tasksValue.unfinished.push(task); //And insert it in the unfinished array, so unfinished-tasks.view.html is updated immediately
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (reopen Task): ', error);
        			throw error;
        		});
        }
        
        //Toggle the priority of a task
        function changeTaskPriority(task) {
        	var updatedTask = createUpdatedTaskModel(task); //Create task model to be inserted or updated in the database (without all the customized gizmos)
        	updatedTask.priority = !updatedTask.priority;
            var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
        	return promise
        		.then(function (response) { //Successful priority toggle
        			var unfinishedIndex = getObjectPositionInArrayById(task, tasksValue.unfinished);
        			if(unfinishedIndex > -1) { //If it exists (just in case)
        				task.priority = !task.priority; //Change the task's priority
                        CustomizeTask(task); //Recustomize the task based on the new priority
        			}
        		})
        		.catch (function (error) {
        			console.log('taskService error (changePriority): ', error);
        			throw error;
        		});
        }
        
        //Save an edited task
        function saveEditedTask(oldTask, newTask) {
	    	var updatedTask = createUpdatedTaskModel(newTask); //Create task model to be inserted or updated in the database (without all the customized gizmos)
	        var promise = $http.put(apiUrl + '/' + updatedTask.id, updatedTask);
	    	return promise
	    		.then(function (response) {
	    			var unfinishedIndex = getObjectPositionInArrayById(oldTask, tasksValue.unfinished); //Get the position of the edited task (only unfinished tasks can be edited)
	    			if(unfinishedIndex > -1) { //If it exists (just in case)
	    				CalculateDeadlineInDays(newTask) //Recalculate the deadline in days (it may have changed)
	    				CustomizeTask(newTask); //Recustomize the task based on the new properties
	    				tasksValue.unfinished.splice(unfinishedIndex, 1, newTask); //Remove old task and insert new task in its place, so unfinished-tasks.view.html is updated immediately
	    			}
	    		})
	    		.catch (function (error) {
	    			console.log('taskService error (saveEditedTask): ', error);
	    			throw error;
	    		});
        }

        //Prepare a task to be sent to the API based on provided parameter 'task', getting only the necessary fields
        function createUpdatedTaskModel(task) {
            var updateTaskDto = {};
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

        //Customize the base model of a task, retrieved from database, for its proper exhibition
        function CustomizeTask(task) {
            task.priorityIcon = (task.priority) ? 'star' : 'star_border'; //Set the priority option icon
            
            //Classes to be applied to the chips that indicate the deadline of each task.
            task.chipClasses = {
            		red: task.deadlineInDays <= 1,
            		orange: task.deadlineInDays >= 2 && task.deadlineInDays <= 4,
            		yellow: task.deadlineInDays >= 5 && task.deadlineInDays <= 7,
            		green: task.deadlineInDays >=8 || task.deadlineInDays == undefined || task.deadlineInDays == null
            };
            
            //Classes to be applied to unfinished tasks
            task.unfinishedCardClasses = {
            		taskCard: true,
                	showCardOptions: false,
            		priorityTask: task.priority
            };
            
          //Classes to be applied to finished tasks
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