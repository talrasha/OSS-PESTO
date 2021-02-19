# Commands to run the server

- 1. Run database locally
     mongod or sudo mongod

  - In case it's not installed, install mongo: https://docs.mongodb.com/v3.2/administration/install-community/

- 2. go inside the server directory (cd server) and Install server dependencies:
     `npm install package.json`

- 3. Run the server locally with nodemon during the development of the system, so nodemon will restart the server after you update any file. before running the server make sure you are inside of the server directory. To run the server use following command:

  ```
  npm start
  ```

- 4. You can now access the backends call using a browser or testing requisitions in other ways.

# Folder structure

- config: All the configurations related to database connection settings.
- controllers: Controllers handle the communication between the functions and the api calls, making this connections.
- models: Related to the abstraction of the objects of the system. The model is writed using Mongoose as base.
- routes: Handle the initial api call, and call the necessary controllers
- app.js: Is the file is responsible for establishing database connection

- index.js: Is the file related to run the server
