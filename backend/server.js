require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const carsRouter = require("./routes/cars");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 4000;

// ======== MIDDLEWARE ========
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files from ../frontend/
app.use(express.static(path.join(__dirname, "../frontend")));

// ======== API ROUTES ========
app.use("/api/cars", carsRouter);
app.use("/api/auth", authRouter);

// ======== FALLBACK FOR CLIENT ROUTES ========
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// ======== DATABASE CONNECTION ========
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
