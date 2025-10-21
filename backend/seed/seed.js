require("dotenv").config();
const mongoose = require("mongoose");
const Car = require("../models/Car");

const data = [
  // Sedans
  {
    title: "Toyota Corolla",
    brand: "Toyota",
    type: "Sedan",
    seats: 5,
    pricePerDay: 30,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
  },
  {
    title: "BMW 3 Series",
    brand: "BMW",
    type: "Sedan",
    seats: 5,
    pricePerDay: 80,
    fuel: "Diesel",
    imgUrl:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
  },
  {
    title: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    type: "Sedan",
    seats: 5,
    pricePerDay: 90,
    fuel: "Diesel",
    imgUrl:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
  },
  {
    title: "Honda Civic",
    brand: "Honda",
    type: "Sedan",
    seats: 5,
    pricePerDay: 35,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=400&h=300&fit=crop",
  },
  {
    title: "Audi A4",
    brand: "Audi",
    type: "Sedan",
    seats: 5,
    pricePerDay: 75,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
  },
  {
    title: "Tesla Model 3",
    brand: "Tesla",
    type: "Sedan",
    seats: 5,
    pricePerDay: 95,
    fuel: "Electric",
    imgUrl:
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
  },

  // SUVs
  {
    title: "Nissan Qashqai",
    brand: "Nissan",
    type: "SUV",
    seats: 5,
    pricePerDay: 45,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
  },
  {
    title: "Toyota RAV4",
    brand: "Toyota",
    type: "SUV",
    seats: 5,
    pricePerDay: 55,
    fuel: "Hybrid",
    imgUrl:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop",
  },
  {
    title: "Honda CR-V",
    brand: "Honda",
    type: "SUV",
    seats: 5,
    pricePerDay: 50,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=300&fit=crop",
  },
  {
    title: "Mazda CX-5",
    brand: "Mazda",
    type: "SUV",
    seats: 5,
    pricePerDay: 52,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1607603750912-57b02d1397e6?w=400&h=300&fit=crop",
  },
  {
    title: "Jeep Wrangler",
    brand: "Jeep",
    type: "SUV",
    seats: 5,
    pricePerDay: 70,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
  },
  {
    title: "Range Rover Sport",
    brand: "Land Rover",
    type: "SUV",
    seats: 7,
    pricePerDay: 120,
    fuel: "Diesel",
    imgUrl:
      "https://images.unsplash.com/photo-1606611013016-969c784e0f7f?w=400&h=300&fit=crop",
  },

  // Trucks
  {
    title: "Ford F-150",
    brand: "Ford",
    type: "Truck",
    seats: 5,
    pricePerDay: 65,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=400&h=300&fit=crop",
  },
  {
    title: "Toyota Hilux",
    brand: "Toyota",
    type: "Truck",
    seats: 5,
    pricePerDay: 60,
    fuel: "Diesel",
    imgUrl:
      "https://images.unsplash.com/photo-1623976274787-7c6919f9c611?w=400&h=300&fit=crop",
  },

  // Coupes
  {
    title: "BMW M4",
    brand: "BMW",
    type: "Coupe",
    seats: 4,
    pricePerDay: 110,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=400&h=300&fit=crop",
  },
  {
    title: "Audi A5",
    brand: "Audi",
    type: "Coupe",
    seats: 4,
    pricePerDay: 85,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1614162692292-7ac56d7f1f10?w=400&h=300&fit=crop",
  },
  {
    title: "Mercedes-Benz C-Class Coupe",
    brand: "Mercedes-Benz",
    type: "Coupe",
    seats: 4,
    pricePerDay: 95,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1617886322395-6c51521e1ab0?w=400&h=300&fit=crop",
  },

  // Hatchbacks
  {
    title: "Volkswagen Golf",
    brand: "Volkswagen",
    type: "Hatchback",
    seats: 5,
    pricePerDay: 38,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?w=400&h=300&fit=crop",
  },
  {
    title: "Ford Focus",
    brand: "Ford",
    type: "Hatchback",
    seats: 5,
    pricePerDay: 32,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
  },
  {
    title: "Mazda 3 Hatchback",
    brand: "Mazda",
    type: "Hatchback",
    seats: 5,
    pricePerDay: 40,
    fuel: "Petrol",
    imgUrl:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=400&h=300&fit=crop",
  },
];

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    await Car.deleteMany({});
    await Car.insertMany(data);
    console.log(`✅ Seeded DB with ${data.length} cars`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  });
