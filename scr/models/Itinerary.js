const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true
  },
  title: String,
  details: [String]
});

module.exports = mongoose.model("Itinerary", itinerarySchema);
