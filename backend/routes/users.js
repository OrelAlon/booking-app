const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/UserController");

const User = require("../models/User");

const router = express.Router();

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

// Get User
router.get("/:id", getUser);

// Get All Users
router.get("/", getUsers);

module.exports = router;
