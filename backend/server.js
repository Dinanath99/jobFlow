const express = require("express");
const cors = require("cors");
const connectDb = require("./utils/connectDb");
require("dotenv").config();
const mainRouter = require("./routes/route.index.js");
const app = express();
app.use(express.json());
app.use(cors());

// Define Routes

const PORT = process.env.PORT || 5000;

//mainrouter
app.use("/api", mainRouter);

// Connect to MongoDB
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
