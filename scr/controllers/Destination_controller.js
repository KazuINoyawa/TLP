
const Destination = require('../models/Destination');

// Lấy tất cả địa điểm, hỗ trợ lọc theo tỉnh/thành, loại hình
exports.getAll = async (req, res) => {
  try {
    const { province, type, q } = req.query;
    let filter = {};
    if (province) filter.province = province;
    if (type) filter.type = type;
    if (q) filter.name = { $regex: q, $options: 'i' };
    const destinations = await Destination.find(filter);
    res.json(destinations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Not found' });
    res.json(destination);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!destination) return res.status(404).json({ error: 'Not found' });
    res.json(destination);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
