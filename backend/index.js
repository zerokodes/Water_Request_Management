const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const requestRoutes = require("./routes/waterRequest");
const connectDB = require("./database/connect");
const userRoutes = require("./routes/user");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/users", userRoutes);

// connect to database
const port = process.env.PORT || 2000;
const MONGO_URI = process.env.MONGO_URI;
const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listen on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
