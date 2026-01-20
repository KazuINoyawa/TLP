const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  province: String,
  type: String,
  description: String,
  images: [String],
  ticketPrice: String,
  openTime: String,
  bestTime: String,
}, { timestamps: true });

module.exports = mongoose.model("Destination", destinationSchema);
