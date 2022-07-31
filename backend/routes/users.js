const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/UserController");

const { verifyUser, verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("hello user, you are logged in and bla bla");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are logged in and bla bla");
// });

// Update User
router.put("/:id", updateUser);

// Delete User
router.delete("/:id", deleteUser);

// Get User
router.get("/:id", getUser);

// Get All Users
router.get("/", getUsers);

module.exports = router;
