import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ItineraryBox from '../components/ItineraryBox';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { fetchDestinationById, fetchItinerary, fetchReviews, addReview } from '../api/api';

const DestinationDetail = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [dest, itin, rev] = await Promise.all([
          fetchDestinationById(id),
          fetchItinerary(id).catch(() => []),
          fetchReviews(id).catch(() => [])
        ]);
        setDestination(dest);
        setItineraries(Array.isArray(itin) ? itin : []);
        setReviews(Array.isArray(rev) ? rev : []);
      } catch (error) {
        console.error('Error loading destination:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  const handleAddReview = async ({ rating, comment }) => {
    try {
      await addReview({ destinationId: id, userName: 'Khách', rating, comment });
      const updatedReviews = await fetchReviews(id);
      setReviews(Array.isArray(updatedReviews) ? updatedReviews : []);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Đang tải thông tin...</p>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="container">
        <div className="empty-state">
          <div className="empty-icon">❌</div>
          <h3>Không tìm thấy địa điểm</h3>
          <Link to="/destinations" className="btn btn-primary">Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page destination-detail-page"
      style={{ paddingTop: '80px', paddingBottom: '40px' }}
    >
      <div className="container">
        <Link to="/destinations" className="back-link">← Quay lại danh sách</Link>
        
        <div className="destination-header">
          <img
            className="details-img"
            src={destination.images?.[0] || 'https://via.placeholder.com/800x400'}
            alt={destination.name}
            style={{ maxWidth: '100%', borderRadius: 8 }}
          />
          <div className="destination-header-content">
            <h1 className="details-title">{destination.name}</h1>
            <div className="destination-meta">
              <span className="meta-item">📍 {destination.province}</span>
              <span className="meta-item">🏷️ {destination.type}</span>
              {destination.rating && (
                <span className="meta-item">
                  ⭐ {destination.rating.toFixed(1)} ({destination.reviewCount || 0} đánh giá)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="destination-info-grid">
          <div className="destination-main">
            <section className="info-section">
              <h2>Thông tin chi tiết</h2>
              <div className="info-list">
                {destination.address && (
                  <div className="info-item">
                    <strong>Địa chỉ:</strong> {destination.address}
                  </div>
                )}
                <div className="info-item">
                  <strong>Giá vé:</strong> {destination.ticketPrice || 'Miễn phí'}
                </div>
                {destination.openTime && (
                  <div className="info-item">
                    <strong>Thời gian mở cửa:</strong> {destination.openTime}
                  </div>
                )}
                {destination.bestTime && (
                  <div className="info-item">
                    <strong>Thời điểm phù hợp:</strong> {destination.bestTime}
                  </div>
                )}
              </div>
            </section>

            {destination.description && (
              <section className="info-section">
                <h2>Mô tả</h2>
                <p className="description-text">{destination.description}</p>
              </section>
            )}

            <ItineraryBox itineraries={itineraries} />
          </div>
        </div>

        <section className="reviews-section">
          <h2>Đánh giá ({reviews.length})</h2>
          <ReviewList reviews={reviews} />
          <ReviewForm onSubmit={handleAddReview} />
        </section>
      </div>
    </motion.div>
  );
};

export default DestinationDetail;
