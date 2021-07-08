"use strict";
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8080;
const userRoutes = require("../server/api/users");

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/api", userRoutes.routes);

app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
