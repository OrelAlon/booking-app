const User = require("../models/User");
const bcrypt = require("bcrypt");
const createError = require("../utils/error");

//
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

//
const login = async (req, res, next) => {
  try {
    // find user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const { password, isAdmin, ...other } = user._doc;

    res.status(200).send({ ...other });
  } catch (err) {
    next(err);
  }
};
module.exports = { register, login };
