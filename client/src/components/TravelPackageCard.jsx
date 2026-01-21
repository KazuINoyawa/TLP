import React, { useState } from 'react';

const formatVnd = (value) => {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  } catch {
    return `${value} VND`;
  }
};

const TravelPackageCard = ({ pkg }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const images = pkg.images?.length ? pkg.images : [];

  const nextImg = () => setImgIdx((prev) => (prev + 1) % images.length);
  const prevImg = () => setImgIdx((prev) => (prev - 1 + images.length) % images.length);

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
          <button className="btn btn-primary" type="button">
            Đặt gói
          </button>
          <button className="btn btn-secondary" type="button">
            Chi tiết
          </button>
        </div>
      </div>
    </article>
  );
};

export default TravelPackageCard;
