const express = require("express");
const { addUser, getAllUsers } = require("../firestore/users");

const router = express.Router();

router.post("/", addUser);
router.get("/", getAllUsers);

module.exports = {
  routes: router,
};
