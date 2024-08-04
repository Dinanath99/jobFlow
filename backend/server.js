const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/connectDb");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const mainRouter = require("./routes/route.index.js");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// Logging for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Define Routes
app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start server
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
