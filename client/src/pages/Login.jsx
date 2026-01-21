import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ isModal, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
        }
        if (isModal && onClose) {
          onClose();
        } else {
          navigate('/destinations');
        }
      } else {
        setError(data.error || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: isModal ? 0 : 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isModal ? 0 : -40 }}
      transition={{ duration: 0.5 }}
      className={isModal ? 'auth-modal-content' : 'page auth-page'}
      style={isModal ? {} : { paddingTop: '80px', paddingBottom: '40px' }}
    >
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Đăng nhập</h1>
            <p>Chào mừng bạn trở lại!</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Tên đăng nhập</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Nhập tên đăng nhập"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Nhập mật khẩu"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Chưa có tài khoản?{' '}
              {isModal ? (
                <span className="auth-link" onClick={() => onClose && onClose('register')}>Đăng ký ngay</span>
              ) : (
                <Link to="/register">Đăng ký ngay</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
