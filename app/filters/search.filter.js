//Filter to search for tasks based on their title or description
(function () {
	'use strict';
	angular.module('letsDoIt').filter('searchTitleAndDescription', searchTitleAndDescription);
	
	function searchTitleAndDescription() {
        return function searchTask(tasks, searchTerms) {
        	if(searchTerms === '' || searchTerms === null || searchTerms === undefined) return tasks; //If search terms are invalid or empty, return all tasks
            var filteredTasks = [];
            searchTerms = searchTerms.toLocaleLowerCase(); //Convert to locale lower case string in order to perform case insensitive search
            angular.forEach(tasks, function(task, position){
            	if(task.title.toLocaleLowerCase().includes(searchTerms) || task.description.toLocaleLowerCase().includes(searchTerms)) { //Check if provided search terms exist in title or desciption of each task
            		filteredTasks.push(task); //If so, this task will be returned in the end of the loop
            	}
            });
            return filteredTasks; //Return all filtered tasks
        };
	}
})();