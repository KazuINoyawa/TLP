import React from 'react';

const ReviewList = ({ reviews }) => (
  <div className="review-list">
    {reviews.length === 0 ? <div>Chưa có nhận xét nào.</div> :
      reviews.map(r => (
        <div className="review-item" key={r._id}>
          <b>{r.userName}</b> - {r.rating}/5<br />
          {r.comment}
        </div>
      ))}
  </div>
);

export default ReviewList;
