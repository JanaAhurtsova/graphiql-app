# GraphiQL-App
GraphiQL is a playground/IDE for graphQL requests. This app uses Rick and Morty API
### Running and start
* Clone this repo: `$ git clone https://github.com/JanaAhurtsova/graphiql-app.git`
* Go to downloaded folder: `$ cd graphiql-app`
* Checkout to develop branch: `$ git checkout develop`
* Go to the GraphQL folder: `$ cd GraphQL`
* Install dependencies: `$ npm install`
* Start app: `$ npm start`
* Unit tests with coverage: `$ npm run coverage`
### Deploy
[GraphiQL-App](https://graphiql-dreamteam.netlify.app/)
## Application Structure
1. Welcome page
2. User auth
3. GraphiQL page
4. 404 page
## Description of function blocks
### General
* Errors from the api side (Not found, unhandled rejection, etc) are displayed in a pop-up
* Using Error boundary
### Welcome page
* If user is not authorized, the page contains a link to Sign In / Sign Up page
* If user is authorized, the page contains a link to the Main page
### Header
* All  routes contain sticky header. When it become sticky (if there is a scroll on a page) color are changed
* Sign Out button - signs user out
* Localization (2 languages). Changing the language by clicking on the switch in header
### Footer
* Footer contains a link to the authors' github, the year the application was created, course logo with link to the course
* Footer is displayed on all pages of the application
### Sign In / Sign Up
* For the authentication are used Firebase with email option
* Client-side validation are implemented (email and password strength - minimum 8 symbols, at least one letter, one digit, one special character)
* Upon successful login, the user are redirected to the GraphiQL page
* If the user is already logged in and tries to reach these routes, they are redirected to the GraphiQL page
### GraphiQL page
* Editor
* Variables section
* Headers section
* Sidebar :
     * Documentation section are visible only when app will receive a successfull response with the schema definition from the api
     * Saving history
     * Hot keys
     * Settings (changing font size)
* Response section
