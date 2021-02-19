const db = require("../models");
const Projects = db.Projects;
const CSVToJSON = require("csvtojson");
const { mongoose } = require("../models");

const database = mongoose.connection;
database.once("open", async function () {
  if ((await Projects.countDocuments().exec()) > 0) return;
  Promise.all([
    CSVToJSON()
      .fromFile("githubdata.csv")
      .then((data) => {
        data.map((item) => Projects.create(item));
      }),
  ]).then(() => console.log("added GitHubs projects data"));
});

const getPagination = (page, size) => {
  const limit = size ? +size : 100;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

exports.findAll = (req, res) => {
  const { page, size, full_name } = req.query;
  var condition = full_name
    ? { full_name: { $regex: new RegExp(full_name), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Projects.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        projects: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Projects.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

// Update a Project by the id in the request
/*
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Projects.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
};
*/

// Delete a Projects with the specified id in the request
/*
exports.delete = (req, res) => {
    const id = req.params.id;

    Projects.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};
 */

// Delete all Projects from the database.
/*
exports.deleteAll = (req, res) => {
    Projects.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

 */

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {

// };
