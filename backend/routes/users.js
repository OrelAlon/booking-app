const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/UserController");

const verifyToken = require("../utils/verifyToken");

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});

// Update User
router.put("/:id", verifyToken, updateUser);

// Delete User
router.delete("/:id", deleteUser);

// Get User
router.get("/:id", getUser);

// Get All Users
router.get("/", getUsers);

module.exports = router;
