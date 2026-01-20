exports.getByDestination = async (req, res) => {
  res.json({ message: "Get reviews" });
};

exports.create = async (req, res) => {
  res.json({ message: "Create review" });
};

exports.remove = async (req, res) => {
  res.json({ message: "Delete review" });
};
