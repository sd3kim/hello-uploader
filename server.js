var express = require("express");
var path = require("path");
var logger = require("morgan");
require("dotenv").config();
require("./backend/config/database");

const app = express();
require("./backend/config/database");

const port = process.env.PORT || 8080;

app.use(logger("dev"));
app.use(express.json());

app.use(auth);

app.use(express.static(path.join(__dirname, "./build")));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
