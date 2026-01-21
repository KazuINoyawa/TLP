import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Giả lập kiểm tra đăng nhập (sau này thay bằng context thực tế)
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✈️</span>
          <span className="logo-text">ViTr</span>
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}> 
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Trang chủ
          </Link>
          <Link 
            to="/destinations" 
            className={`nav-link ${isActive('/destinations') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Địa điểm
          </Link>
          {isLoggedIn && (
            <Link 
              to="/my-bookings" 
              className={`nav-link ${isActive('/my-bookings') ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Gói đã đặt
            </Link>
          )}
          {!isLoggedIn && (
            <>
              <span
                className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => { setIsMenuOpen(false); setAuthModal({ open: true, mode: 'login' }); }}
              >
                Đăng nhập
              </span>
              <span
                className={`nav-link nav-link-button ${isActive('/register') ? 'active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => { setIsMenuOpen(false); setAuthModal({ open: true, mode: 'register' }); }}
              >
                Đăng ký
              </span>
            </>
          )}
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        onClose={(nextMode) => {
          if (nextMode === 'register') setAuthModal({ open: true, mode: 'register' });
          else if (nextMode === 'login') setAuthModal({ open: true, mode: 'login' });
          else setAuthModal({ open: false, mode: 'login' });
        }}
      />
    </header>
  );
};

export default Header;
