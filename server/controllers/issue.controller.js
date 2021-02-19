const db = require("../models");
const Issues = db.Issues;
const CSVToJSON = require("csvtojson");
const { mongoose } = require("../models");

const database = mongoose.connection;
database.once("open", async function () {
  if ((await Issues.countDocuments().exec()) > 0) return;
  Promise.all([
    CSVToJSON()
      .fromFile("newIssuedata.csv")
      .then((data) => {
        data.map((item) => Issues.create(item));
      }),
  ]).then(() => console.log("added Issues"));
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

  Issues.paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        issues: data.docs,
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

  Issues.findById(id)
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
