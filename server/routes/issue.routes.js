module.exports = app => {
    const issues = require("../controllers/issue.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    // router.post("/", projects.create);
  
    // Retrieve all Tutorials
    router.get("/", issues.findAll);
  
  
    // Retrieve a single Tutorial with id
    router.get("/:id", issues.findOne);
  
    // Update a Tutorial with id
    // router.put("/:id", projects.update);
  
    // Delete a Tutorial with id
    // router.delete("/:id", projects.delete);
  
    // Create a new Tutorial
    // router.delete("/", projects.deleteAll);
  
    app.use('/api/issues', router);
  };