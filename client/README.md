# Commands to run the client side

1. Enter the client directory (cd client) and Install client dependencies:
   `npm install package.json`

2. In the client directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# Folder structure

- public: favicon, public css style is added in this directory.
- src: In this directory along with components and services directory there are several files included.

  - components: Inside components directory all the components are available for Navbar, Footer, DataTable, TabData etc.

  - Services: This directory is responsible for getting different paths with different parameters.
  - http-common: this file is calling the backend api to load necessary data

- app.js: Is responsible for routing and loading all the components

- index.js: Is the file related to run the client
