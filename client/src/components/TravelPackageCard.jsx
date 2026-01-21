import React, { useState } from 'react';

const formatVnd = (value) => {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  } catch {
    return `${value} VND`;
  }
};


import { useNavigate } from 'react-router-dom';

const TravelPackageCard = ({ pkg }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const images = pkg.images?.length ? pkg.images : [];
  const navigate = useNavigate();

  // Giả lập kiểm tra đăng nhập (sau này thay bằng context thực tế)
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  const nextImg = () => setImgIdx((prev) => (prev + 1) % images.length);
  const prevImg = () => setImgIdx((prev) => (prev - 1 + images.length) % images.length);

  const handleBook = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setShowBookModal(true);
  };

  const handleDetail = () => {
    navigate(`/travel-packages/${pkg.id}`);
  };

  return (
    <article className="pkg-card">
      <div className="pkg-media">
        {images.length > 0 ? (
          <>
            <img className="pkg-img" src={images[imgIdx]} alt={pkg.name} loading="lazy" />
            {images.length > 1 && (
              <div className="pkg-img-nav">
                <button className="pkg-img-btn" onClick={prevImg} type="button" aria-label="Ảnh trước">
                  ‹
                </button>
                <div className="pkg-img-dots" aria-label="Bộ ảnh mô tả">
                  {images.map((_, i) => (
                    <span key={i} className={`pkg-dot ${i === imgIdx ? 'active' : ''}`} />
                  ))}
                </div>
                <button className="pkg-img-btn" onClick={nextImg} type="button" aria-label="Ảnh sau">
                  ›
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="pkg-img-placeholder">📷</div>
        )}

        <div className="pkg-badges">
          <span className="badge badge-type">{pkg.travelType}</span>
          <span className="badge badge-people">{pkg.people} người</span>
          <span className="badge badge-days">{pkg.duration}</span>
        </div>
      </div>

      <div className="pkg-body">
        <div className="pkg-title-row">
          <h3 className="pkg-title">{pkg.name}</h3>
          <div className="pkg-price">{formatVnd(pkg.priceVnd)}</div>
        </div>

        <div className="pkg-destination">
          <span className="pkg-destination-label">Địa điểm:</span> {pkg.destinationName} · {pkg.province}
        </div>

        <div className="pkg-services">
          <div className="pkg-services-title">Dịch vụ đi kèm</div>
          <ul className="pkg-services-list">
            {pkg.services.map((s, idx) => (
              <li key={idx}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="pkg-actions">
          <button className="btn btn-primary" type="button" onClick={handleBook}>
            Đặt gói
          </button>
          <button className="btn btn-secondary" type="button" onClick={handleDetail}>
            Chi tiết
          </button>
        </div>

        {showLoginPrompt && (
          <div className="pkg-modal-overlay" onClick={() => setShowLoginPrompt(false)}>
            <div className="pkg-modal" onClick={e => e.stopPropagation()}>
              <h4>Yêu cầu đăng nhập</h4>
              <p>Bạn cần đăng nhập để sử dụng chức năng này.</p>
              <button className="btn btn-primary" onClick={() => { setShowLoginPrompt(false); navigate('/login'); }}>Đăng nhập</button>
              <button className="btn btn-secondary" onClick={() => setShowLoginPrompt(false)}>Đóng</button>
            </div>
          </div>
        )}

        {showBookModal && (
          <div className="pkg-modal-overlay" onClick={() => setShowBookModal(false)}>
            <div className="pkg-modal" onClick={e => e.stopPropagation()}>
              <h4>Xác nhận đặt gói</h4>
              <p>Bạn muốn đặt gói <b>{pkg.name}</b>?</p>
              <button className="btn btn-primary" onClick={() => { setShowBookModal(false); /* TODO: Gọi API đặt gói */ }}>Xác nhận</button>
              <button className="btn btn-secondary" onClick={() => setShowBookModal(false)}>Hủy</button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default TravelPackageCard;
