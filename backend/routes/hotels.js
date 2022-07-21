const express = require("express");
const Hotel = require("../models/Hotel");

const router = express.Router();

// Create Hotel
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Hotel
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Hotel
router.delete("/:id", async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json("Hotel Delete");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get Hotel
router.get("/:id", async (req, res) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);

    res.status(200).json(getHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Hotels
router.get("/", async (req, res, next) => {
  // const failed = true
  // if (failed) return next(handleError(401,'You are not authenticated'))
  try {
    const getHotels = await Hotel.find();

    res.status(200).json(getHotels);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
