import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const handleSubmit = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    onSubmit({ rating, comment });
  };

  return (
    <div className="add-review">
      <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} placeholder="Đánh giá (1-5)" />
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Nhận xét..." />
      <button onClick={handleSubmit}>Gửi đánh giá</button>
      {showLoginPrompt && (
        <div className="pkg-modal-overlay" onClick={() => setShowLoginPrompt(false)}>
          <div className="pkg-modal" onClick={e => e.stopPropagation()}>
            <h4>Yêu cầu đăng nhập</h4>
            <p>Bạn cần đăng nhập để gửi đánh giá.</p>
            <button className="btn btn-primary" onClick={() => { setShowLoginPrompt(false); window.location.href = '/login'; }}>Đăng nhập</button>
            <button className="btn btn-secondary" onClick={() => setShowLoginPrompt(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
