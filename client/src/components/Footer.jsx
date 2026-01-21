import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">
            <span className="logo-icon">✈️</span>
            Vietnam Travel
          </h3>
          <p className="footer-description">
            Khám phá vẻ đẹp của Việt Nam qua những địa điểm du lịch tuyệt vời. 
            Tìm kiếm và lên kế hoạch cho chuyến đi của bạn ngay hôm nay.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Liên kết nhanh</h4>
          <ul className="footer-links">
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/destinations">Địa điểm du lịch</Link></li>
            <li><Link to="/packages">Gói du lịch</Link></li>
            <li><Link to="/login">Đăng nhập</Link></li>
            <li><Link to="/register">Đăng ký</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Thông tin</h4>
          <ul className="footer-links">
            <li><a href="#about">Về chúng tôi</a></li>
            <li><a href="#contact">Liên hệ</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
            <li><a href="#terms">Điều khoản</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Theo dõi chúng tôi</h4>
          <div className="footer-social">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Twitter">🐦</a>
            <a href="#" aria-label="YouTube">📺</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Vietnam Travel. Tất cả quyền được bảo lưu.</p>
      </div>
    </footer>
  );
};

export default Footer;
