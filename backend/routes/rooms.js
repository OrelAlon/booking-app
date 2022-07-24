const express = require("express");

const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
} = require("../controllers/roomController");

const router = express.Router();

// Create Room
router.post("/:hotelid", createRoom);

// Update Room
router.put("/:id", updateRoom);

// Delete Room
router.delete("/:id/:hotelid", deleteRoom);

// Get Room
router.get("/:id", getRoom);

// Get All Rooms
router.get("/", getRooms);

module.exports = router;
