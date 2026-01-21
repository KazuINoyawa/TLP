import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = ({ isModal, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isModal && onClose) {
          onClose('login');
        } else {
          navigate('/login');
        }
      } else {
        setError(data.error || 'Đăng ký thất bại');
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
            <h1>Đăng ký</h1>
            <p>Tạo tài khoản mới để bắt đầu khám phá</p>
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
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                minLength={6}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Đã có tài khoản?{' '}
              {isModal ? (
                <span className="auth-link" onClick={() => onClose && onClose('login')}>Đăng nhập ngay</span>
              ) : (
                <Link to="/login">Đăng nhập ngay</Link>
              )}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
