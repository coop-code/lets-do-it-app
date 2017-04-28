# The Lets Do It Project

Lets Do IT is a task management app (a to-do list) implemented for studying purposes. In this project, you can do all the operations regarding tasks (read, create, edit and delete). Some other functionalities were added as well, such as prioritizing tasks. Feel free to use it the way you like.

This project is divided into two subprojects:

* The **frontend** subproject: the Lets Do It App, implemented using the **AngularJS** framework and the **Angular Material** for better UX. This APP will be described in details in this document.
* The **backend** subproject: the [Lets Do It Api](https://github.com/coop-code/lets-do-it-api), which is a RESTFul Web Api implemented using NodeJS and MongoDB.

The main goal of the APP is to deal with user interactions.
The API, on the other way, deal with the data itself: processing and answering to all the requests made by the APP, such as task creation, getting tasks and much more.

The rest of this document will focus only on the APP. For more information about the API, please check its [repository](https://github.com/coop-code/lets-do-it-api)

# Lets Do It App

Lets Do It App is the frontend part of the Lets Do It project.
This app is developed using the **AngularJS** framework and the **Angular Material** for better UX.

As said, it has studying purposes. In other words, It's a **demonstration** of how AngularJS and Angular Material work together. Feel free to test it the way you like.

Just one more information, this app don't have user authentication yet, so the tasks are the same for everyone.

Special Thanks to Pluralsight for providing amazing courses on AngularJS and [John Papa](https://github.com/johnpapa) for providing an excellent [style guide on AngularJS](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).

## Setup

1. Clone this repository 
2. Open an console in the project folder and run `npm install` to install all the dependencies.
3. Run `npm start` to the start the application.

There's no need to worry about setting up the Lets Do It API, it's already up and running.
