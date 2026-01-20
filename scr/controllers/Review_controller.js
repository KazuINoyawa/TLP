const Review = require('../models/Review');
const Destination = require('../models/Destination');

// Lấy tất cả đánh giá của một địa điểm
exports.getByDestination = async (req, res) => {
  try {
    const reviews = await Review.find({ destinationId: req.params.destinationId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { destinationId, userName, rating, comment } = req.body;
    const review = new Review({ destinationId, userName, rating, comment });
    await review.save();
    // Cập nhật điểm trung bình và số lượng đánh giá cho địa điểm
    const reviews = await Review.find({ destinationId });
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await Destination.findByIdAndUpdate(destinationId, {
      rating: avgRating,
      reviewCount: reviews.length
    });
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Not found' });
    // Cập nhật lại điểm trung bình và số lượng đánh giá cho địa điểm
    const reviews = await Review.find({ destinationId: review.destinationId });
    const avgRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
    await Destination.findByIdAndUpdate(review.destinationId, {
      rating: avgRating,
      reviewCount: reviews.length
    });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
