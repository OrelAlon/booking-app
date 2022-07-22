const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
} = require("../controllers/hotelController");

const router = express.Router();

// Create Hotel
router.post("/", createHotel);

// Update Hotel
router.put("/:id", updateHotel);

// Delete Hotel
router.delete("/:id", deleteHotel);

// Get Hotel
router.get("/:id", getHotel);

// Get All Hotels
router.get("/", getHotels);

module.exports = router;
