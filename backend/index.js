const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");

dotenv.config();

// routes
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const hotelsRoute = require("./routes/hotels");
const roomsRoute = require("./routes/rooms");

// connect to mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, () => {
      console.log("Connected to MongoDB !!");
    });
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
});

// app.get("/", (req, res) => {
//   res.json("hello");
// });

// // middlewares
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

// Serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production"));
}

//
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMsg = err.message || "Something crashhh";
  return res.status(errorStatus).json("My Error: " + errorMsg);
});

// connect to backend
app.listen(8000, () => {
  connect();
  console.log("Connected to backend !!");
});

// for concurrently ==> npm run dev ==> from main folder
