module.exports = app => {
    const projects = require("../controllers/project.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // router.post("/", projects.create);
  
    // Retrieve all Tutorials
    router.get("/", projects.findAll);
  
  
    // Retrieve a single Tutorial with id
    router.get("/:id", projects.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", projects.update);
  
    // Delete a Tutorial with id
    // router.delete("/:id", projects.delete);
  
    // Create a new Tutorial
    // router.delete("/", projects.deleteAll);
  
    app.use('/api/projects', router);
  };