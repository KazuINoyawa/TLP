import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  return (
    <div className="add-review">
      <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} placeholder="Đánh giá (1-5)" />
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Nhận xét..." />
      <button onClick={() => onSubmit({ rating, comment })}>Gửi đánh giá</button>
    </div>
  );
};

export default ReviewForm;
