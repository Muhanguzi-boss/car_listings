const express = require("express");
const router = express.Router();
const Car = require("../models/Car");

// GET all cars (optionally filter by type/query)
router.get("/", async (req, res) => {
  try {
    const { q, type } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (q) filter.title = { $regex: q, $options: "i" };
    const cars = await Car.find(filter).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET single car
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ error: "Not found" });
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST create a car
router.post("/", async (req, res) => {
  try {
    const car = new Car(req.body);
    await car.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a car
router.put("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!car) return res.status(404).json({ error: "Not found" });
    res.json(car);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a car
router.delete("/:id", async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
