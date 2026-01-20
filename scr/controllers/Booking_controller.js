const Booking = require('../models/Booking');
const jwt = require('jsonwebtoken');

// Lấy tất cả booking của user
exports.getByUser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const bookings = await Booking.find({ userId: payload.id }).populate('destinationId itineraryId');
    res.json(bookings);
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Đặt dịch vụ du lịch
exports.create = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const { destinationId, itineraryId, name, phone, date } = req.body;
    const booking = new Booking({ userId: payload.id, destinationId, itineraryId, name, phone, date, confirmed: false });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Xác nhận booking
exports.confirm = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const booking = await Booking.findOne({ _id: req.params.id, userId: payload.id });
    if (!booking) return res.status(404).json({ error: 'Not found' });
    booking.confirmed = true;
    await booking.save();
    res.json({ message: 'Confirmed', booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
