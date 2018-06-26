[![Build Status](https://travis-ci.org/amarachukwu-agbo/hello-books.svg?branch=develop)](https://travis-ci.org/amarachukwu-agbo/hello-books)
[![Coverage Status](http://coveralls.io/repos/github/amarachukwu-agbo/hello-books/badge.svg?branch=develop)](https://coveralls.io/github/amarachukwu-agbo/hello-books?branch=develop)
[![](https://img.shields.io/badge/Protected_by-Hound-a873d1.svg)](https://houndci.com)
[![Maintainability](https://api.codeclimate.com/v1/badges/e82d32cd9204d56c8172/maintainability)](https://codeclimate.com/github/amarachukwu-agbo/hello-books/maintainability)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/hyperium/hyper/master/LICENSE)
# Hello-books
Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, edit details of a book, accept/reject user's requests to
borrow or return a book.

## API Documentation
Visit [here](https://hello-books-v2.herokuapp.com/docs/#/) for a detailed documentation on the API endpoints used in the application

## Hosting
* The API is hosted on https://hello-books-v2.herokuapp.com/api/v1/
* The Application is hosted on https://hello-books-v2.herokuapp.com

## Technologies used
* [JavaScript](https://www.javascript.com/) - A programming language for the web
* [NodeJS](https://nodejs.org/en/) - A Javascript runtime environment built using Chrome's v8 engine that makes it possible to run JavaScript on the server. It allows developers to build the front-end and back-end of an application using JavaScript.
* [ExpressJS](https://expressjs.com/) - A lightweight JavaScript framework that lets you organize web applications in an MVC architecture on the server-side. It Helps with handling routing, requests and views.
* [Sequelize](http://docs.sequelizejs.com/) - A promise-based ORM for SQL databases compatible with NodeJS. It supports relations, read replication and more.
* [Postgres](https://www.postgresql.org/) - A robust open-source relational database system built on SQL standards.
* [React](https://www.reactjs.org/) - A JavaScript front-end library used for building user interfaces with components.
* [Redux](http://redux.js.org/) - An open-source JavaScript library for managing application's state compatible with React.

## Features
* A landing page showing books most popular among users.
* Users can view books in the application.
* Users can view a particular book's details including author, title, quantity, subject, description, image and reviews.
* Users can search for a book in the application.
* Users can register in the application.
* Registered users can log in into the application.
* Registered users can upvote/downvote a book in the application.
* Registered users can provide a review for a book in the application.
* Registered users can add a book to their favorites.
* Registered users can view their favorite books.
* Registered users can borrow a book in the application.
* Registered users can return a borrowed book.
* An admin can add a book to the application.
* An admin can modify a book in the application.
* An admin can delete a book.
* An admin can accept/reject a request by a user to borrow a book.
* An admin can accept/reject a request by a user to return a book.
* Registered users get an email notification when their borrow/return request is accepted/declined.
* Registered users can view their profile.

## Installation and setup
1. Install [`NodeJS`](https://nodejs.org/en/download/)
2. Install [`Postgres`](https://www.postgresql.org/download/)
3. Clone the repository using the command
    ```
    git clone https://github.com/amarachukwu-agbo/hello-books.git
    ```
4. Change directory to the project's folder using the command
    ```
    cd hello-books
    ```
5. Install project's dependencies using the command
    ```
    npm install
    ```
6. Set up Postgres. Add database configuration for development and test as specified in `./server/config/config.js`        using the sample .env file as a guide.

7. Run database migrations to create the models in the database using the command
    ```
    sequelize db:migrate
    ```
8. Seed data into the database to set up initial data
    ```
    sequelize db:seed:all
    ```
9. Start the application
    * Start the server with ```
    npm run start:server ```
    * Start the client with ```
    npm run start: client ```
10. Open the browser and run the application on the address 
    ```
    http://127.0.0.1:8080/

## Testing
### Server-side tests
- Implememted with `chai`, `supertest`
  Run the command
  ```
    npm test
  ```
### Client-side tests
- Implememted with `Jest`, `Enzyme`
  Run the command
  ```
    npm test:client
  ```

## Limitations
- Users token expires after 24 hours and user has to obtain another token.
- Users cannot reset their passwords.
- Users cannot edit their profile.
- Users cannot sign in or sign up using OAuth startegy
- Users do not receive email notification to verify their email when they sign up
- Users cannot edit a review
- Users do not receive email notification when an admin modifies their favorite book

## Contributing
Contributions are welcome. Interested contributors should follow the steps below
- Fork the repository
- Checkout to a new branch for your feature or bug-fix. Name branches after branch [naming conventions](https://github.com/amarachukwu-agbo/hello-books/wiki/Branch-Naming-Convention) in Project's wiki.
- Make your changes.
- Commit your changes. Commits should be detailed and should follow the 
[commit standards](https://github.com/amarachukwu-agbo/hello-books/wiki/Commit-Message-Conventions) in Project's wiki.

- Raise a pull request against develop following the [pull request standard](https://github.com/amarachukwu-agbo/hello-books/wiki/PR-Conventions) in Project's wiki.

## FAQ
#### Who can contribute?
We welcome contributions from anyone! Ensure you follow the contribution guidelines above.
#### Is there a set standard for PRs to this repository?
Yes please check the project [wiki](https://github.com/amarachukwu-agbo/hello-books/wiki) for project conventions.
#### Can I clone this application for personal use?
Yes!. This application is licensed under MIT, and is open for everybody

## License
This project is licensed under the [MIT License](https://github.com/amarachukwu-agbo/hello-books/blob/develop/LICENSE)