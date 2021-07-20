"use strict";
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const userRoutes = require("../server/api/users");
const articleRoutes = require("../server/api/articles");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes.routes);
app.use("/api", articleRoutes.routes);

app.use("/auth", require("./auth"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
