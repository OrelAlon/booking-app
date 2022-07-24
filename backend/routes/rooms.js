const express = require("express");

const { createRoom } = require("../controllers/roomController");

const router = express.Router();

// Create Room
router.post("/:hotelid", createRoom);

module.exports = router;
