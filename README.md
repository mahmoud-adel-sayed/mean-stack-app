# Mean Stack App
this is a mean (MongoDB , Express , Angular , NodeJS) application sample

### Installion
1. You have to install [NodeJs](https://nodejs.org) first.
2. You have to install [MongoDB](https://www.mongodb.com/).
3. then download or clone the app.

### Run the application
1. open your CLI or terminal & cd project folder.
2. type ($ npm install) to install the app dependencies .
3. run the mongod server
4. type in termianl ($ grunt) we use Grunt task runner to start the app and by default it will (run nodemon and set NODE_env to development , cocate & minify css , js files ).
5. If you want to upload images we use AWS(amazon web services) S3 storage to store our images , so you have to set (AWS_ACCESS_KEY , AWS_SECRET_KEY) enviroment variables when you start the app , so instead of type ($ grunt) in CLI you will type ($ AWS_ACCESS_KEY=youraccesskey AWS_SECRET_KEY=yoursecretkey grunt).
