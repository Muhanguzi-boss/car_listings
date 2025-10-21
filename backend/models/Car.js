const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  brand: String,
  type: String, // e.g., Sedan, SUV
  seats: Number,
  pricePerDay: Number,
  fuel: String,
  imgUrl: String, // store image filename or URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Car", CarSchema);
