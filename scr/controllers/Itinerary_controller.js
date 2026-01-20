exports.getByDestination = async (req, res) => {
  res.json({ message: "Get itineraries" });
};

exports.create = async (req, res) => {
  res.json({ message: "Create itinerary" });
};

exports.update = async (req, res) => {
  res.json({ message: "Update itinerary" });
};

exports.remove = async (req, res) => {
  res.json({ message: "Delete itinerary" });
};
