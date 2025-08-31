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

// CORS configuration for Vercel deployment
const corsOptions = {
  origin: [
    "http://localhost:5173", // for local development
    "https://your-frontend-app.vercel.app" // replace with your actual frontend URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
};
app.use(cors(corsOptions));

// Logging for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

// Root route for health check
app.get('/', (req, res) => {
    res.json({ message: 'JobFlow API is running!' });
});

// Define Routes
app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDb();
    console.log('MongoDB connected successfully');
    
    // For Vercel, we don't need app.listen in production
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }
};

// Start server
startServer();

// Export the app for Vercel
module.exports = app;