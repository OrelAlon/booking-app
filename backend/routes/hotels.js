const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
} = require("../controllers/hotelController");

const { verifyAdmin } = require("../utils/verifyToken");

const router = express.Router();

// Create Hotel
router.post("/", verifyAdmin, createHotel);

// Update Hotel
router.put("/:id", verifyAdmin, updateHotel);

// Delete Hotel
router.delete("/:id", verifyAdmin, deleteHotel);

// Get Hotel
router.get("/find/:id", getHotel);

// Get All Hotels
router.get("/", getHotels);

//
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

module.exports = router;
