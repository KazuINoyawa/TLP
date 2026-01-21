import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';

const AuthModal = ({ open, mode, onClose }) => {
  if (!open) return null;
  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>&times;</button>
        {mode === 'login' ? <Login isModal onClose={onClose} /> : <Register isModal onClose={onClose} />}
      </div>
    </div>
  );
};

export default AuthModal;
