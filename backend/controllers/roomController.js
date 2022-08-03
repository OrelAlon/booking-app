const Room = require("../models/Room");
const Hotel = require("../models/Hotel");

const createError = require("../utils/error");

//
const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: {
          rooms: savedRoom._id,
        },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

//
const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};

//
const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },

      {
        $push: { "roomNumbers.$.unavailableDates": req.body.dates },
      }
    );

    res.status(200).json("Room status is updated");
  } catch (err) {
    next(err);
  }
};
//
const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    await Room.findByIdAndDelete(req.params.id);

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: {
          rooms: req.params._id,
        },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room  Delete");
  } catch (err) {
    next(err);
  }
};

//
const getRoom = async (req, res, next) => {
  try {
    const getRoom = await Room.findById(req.params.id);

    res.status(200).json(getRoom);
  } catch (err) {
    next(err);
  }
};

//
const getRooms = async (req, res, next) => {
  try {
    const getRooms = await Room.find();

    res.status(200).json(getRooms);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
};
