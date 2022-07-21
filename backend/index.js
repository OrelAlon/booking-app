const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, () => {
      console.log("Connected to MongoDB !!");
    });
  } catch (error) {
    throw error;
  }
};
app.listen(8000, () => {
  connect();
  console.log("Connected to backend !!");
});
