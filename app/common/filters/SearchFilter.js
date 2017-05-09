(function () {
	"use strict";
	angular
		.module('letsDoIt')
		.filter('searchTitleAndDescription', function () {
	        return function searchTask(tasks, searchTerms) {
	        	if(searchTerms === '' || searchTerms === null || searchTerms === undefined) return tasks;
	            var filteredTasks = [];
	            searchTerms = searchTerms.toLocaleLowerCase();
	            angular.forEach(tasks, function(task, position){
	            	if(task.title.toLocaleLowerCase().includes(searchTerms) || task.description.toLocaleLowerCase().includes(searchTerms)) {
	            		filteredTasks.push(task);
	            	}
	            });
	            return filteredTasks;
	        };
		});
})();