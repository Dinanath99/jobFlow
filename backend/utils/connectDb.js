const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("connected to mongodb");
  } catch (error) {
    console.log("error connecting to mongodb");
  }
};

module.exports = connectDb;
