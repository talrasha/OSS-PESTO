import axios from "axios";

// NODE_ENV = 'development'
// NODE_ENV = 'production'

// if we are in production baseurl = /api
// else baseurl = http://localhost:3001/api/

export default axios.create({
  baseURL: "http://localhost:27017/api/", //CHANGED back to 3001
  headers: {
    "Content-type": "application/json",
  },
});
