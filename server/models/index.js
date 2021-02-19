const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Projects = require("./project.model.js")(mongoose, mongoosePaginate);
db.Issues = require("./issues.model.js")(mongoose, mongoosePaginate);
db.Reddit = require("./reddit.model.js")(mongoose, mongoosePaginate);

module.exports = db;
