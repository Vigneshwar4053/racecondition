const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Missing MONGODB_URI in .env");
  const conn = await mongoose.connect(uri);
  isConnected = conn.connections[0].readyState === 1;
  console.log("MongoDB connected");
}

module.exports = connectDB;
