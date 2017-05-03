# The Lets Do It Project

Lets Do IT is a task management app (a to-do list) implemented for studying purposes. In this project, you can do all the operations regarding tasks (read, create, edit and delete). Some other functionalities were added as well, such as prioritizing tasks. Feel free to use it the way you like.

This project is divided into two subprojects:

* The **frontend** subproject: the Lets Do It App, implemented using the **AngularJS** framework and the **Angular Material** for better UX. This APP will be described in details in this document.
* The **backend** subproject: the [Lets Do It Api](https://github.com/coop-code/lets-do-it-api), which is a RESTFul Web Api implemented using NodeJS and MongoDB.

The main goal of the APP is to deal with user interactions.
The API, on the other way, deal with the data itself: processing and answering to all the requests made by the APP, such as task creation, getting tasks and much more.

To work properly, **both the APP and the API need to be running**. There's a setup section in this document that explains how to start both applications.

The rest of this document will focus only on the APP. For more information about the API, please check its [repository](https://github.com/coop-code/lets-do-it-api)

# The Lets Do It App

Lets Do It App is the frontend part of the Lets Do It project.
This app is developed using the **AngularJS** framework and the **Angular Material** for better UX.

As said, it has studying purposes. In other words, It's a **demonstration** of how AngularJS and Angular Material work together. Feel free to test it the way you like.

## Setup

### Lets Do It APP

1. Clone this repository 
2. Open an console in the project folder and run `npm install` to install all the dependencies.
3. Run `npm start` to the start the application.

###  Lets Do It API

1. Clone its [repository](https://github.com/coop-code/lets-do-it-api) 
2. Open an console in the project folder and run `npm install` to install all the dependencies.
3. Run `npm start` to the start the application.

The interacation between APP and API is already set. There's no need to open the source code to configure it.

If you have any issue or comment, you can contact the [developers](https://github.com/coop-code/lets-do-it-app/graphs/contributors) or register and [issue](https://github.com/coop-code/lets-do-it-app/issues) anytime. Feedback is very important to us.

## Additional Information

- The project does not work with user authentication yet.
- The tasks are registered globally, which means that they are the same for everyone.

## Special Thanks

Special Thanks to Pluralsight for providing amazing courses and [John Papa](https://github.com/johnpapa) for providing an excellent [style guide on AngularJS](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).
