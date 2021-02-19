module.exports = (app) => {
  const reddit = require("../controllers/reddit.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  // router.post("/", projects.create);

  // Retrieve all Tutorials
  router.get("/", reddit.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", reddit.findOne);

  // Update a Tutorial with id
  // router.put("/:id", projects.update);

  // Delete a Tutorial with id
  // router.delete("/:id", projects.delete);

  // Create a new Tutorial
  // router.delete("/", projects.deleteAll);

  app.use("/api/reddit", router);
};
