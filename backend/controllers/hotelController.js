const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

//
const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};

//
const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};

//
const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);

    res.status(200).json("Hotel Delete");
  } catch (err) {
    next(err);
  }
};

//
const getHotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);

    res.status(200).json(getHotel);
  } catch (err) {
    next(err);
  }
};

//
const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const getHotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);

    res.status(200).json(getHotels);
  } catch (err) {
    next(err);
  }
};

//
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
        //.find({ city: city }).length;
      })
    );

    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

//
const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartment", count: apartmentCount },
    ]);
  } catch (err) {
    next(err);
  }
};
const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
};
