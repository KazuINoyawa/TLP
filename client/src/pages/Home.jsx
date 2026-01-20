import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const features = [
    {
      icon: '🔍',
      title: 'Tìm kiếm dễ dàng',
      description: 'Tìm kiếm địa điểm du lịch theo tên, tỉnh thành hoặc loại hình du lịch'
    },
    {
      icon: '📍',
      title: 'Thông tin chi tiết',
      description: 'Xem thông tin đầy đủ về địa điểm, giá vé, thời gian mở cửa và đánh giá'
    },
    {
      icon: '🗺️',
      title: 'Lịch trình gợi ý',
      description: 'Nhận gợi ý lịch trình du lịch phù hợp cho từng địa điểm'
    },
    {
      icon: '⭐',
      title: 'Đánh giá thực tế',
      description: 'Đọc và chia sẻ đánh giá từ những người đã từng đến thăm'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hero-title"
          >
            Khám phá vẻ đẹp Việt Nam
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hero-subtitle"
          >
            Tìm kiếm và khám phá những địa điểm du lịch tuyệt vời trên khắp đất nước
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="hero-buttons"
          >
            <Link to="/destinations" className="btn btn-primary">
              Khám phá ngay
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Đăng ký miễn phí
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Tại sao chọn chúng tôi?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="cta-content"
          >
            <h2 className="cta-title">Sẵn sàng bắt đầu hành trình của bạn?</h2>
            <p className="cta-text">Khám phá ngay những địa điểm du lịch tuyệt vời nhất Việt Nam</p>
            <Link to="/destinations" className="btn btn-primary btn-large">
              Xem danh sách địa điểm
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
