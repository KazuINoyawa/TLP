import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DestinationCard = ({ destination }) => (
  <motion.div
    className="card"
    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #4dd0e1' }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Link to={`/destination/${destination._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <img src={destination.images?.[0] || 'https://via.placeholder.com/400x160'} alt={destination.name} />
      <div className="card-title">{destination.name}</div>
      <div className="card-info">{destination.province} | {destination.type}</div>
      <div className="card-info">Đánh giá: {destination.rating?.toFixed(1) || 0} ({destination.reviewCount || 0})</div>
    </Link>
  </motion.div>
);

export default DestinationCard;
