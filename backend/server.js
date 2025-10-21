require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const carsRouter = require("./routes/cars");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files from ../frontend/
app.use(express.static(path.join(__dirname, "../frontend")));

// API routes
app.use("/api/cars", carsRouter);

// Fallback to index.html for client-side routing
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Connect to MongoDB then start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
