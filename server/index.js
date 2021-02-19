const http = require("http");
const app = require("./app");
const server = http.createServer(app);

require("./routes/project.routes")(app);
require("./routes/issue.routes")(app);
require("./routes/reddit.routes")(app);

const PORT = process.env.PORT || 27017;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
