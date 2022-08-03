const express = require("express");

const {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} = require("../controllers/roomController");

const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// Create Room
router.post("/:hotelid", verifyAdmin, createRoom);

// Update Room
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete Room
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// Get Room
router.get("/:id", getRoom);

// Get All Rooms
router.get("/", verifyAdmin, getRooms);

module.exports = router;
