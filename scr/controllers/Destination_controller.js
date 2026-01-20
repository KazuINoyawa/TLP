exports.getAll = async (req, res) => {
  res.json({ message: "Get all destinations" });
};

exports.getById = async (req, res) => {
  res.json({ message: "Get destination detail" });
};

exports.create = async (req, res) => {
  res.json({ message: "Create destination" });
};

exports.update = async (req, res) => {
  res.json({ message: "Update destination" });
};

exports.remove = async (req, res) => {
  res.json({ message: "Delete destination" });
};
