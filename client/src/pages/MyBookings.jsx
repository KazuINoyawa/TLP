import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { fetchBookings, cancelBooking } from '../api/api'; // TODO: Kết nối API thực tế

// Dữ liệu mẫu (sau này thay bằng fetchBookings)
const mockBookings = [
  {
    _id: 'b1',
    packageName: 'Gói Đà Nẵng - Tiết kiệm',
    province: 'Đà Nẵng',
    priceVnd: 1690000,
    status: 'Đã đặt',
    createdAt: '2026-01-20',
  },
  {
    _id: 'b2',
    packageName: 'Gói Hạ Long - Cao cấp',
    province: 'Quảng Ninh',
    priceVnd: 3990000,
    status: 'Đã đặt',
    createdAt: '2026-01-10',
  },
];

const formatVnd = (value) => {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  } catch {
    return `${value} VND`;
  }
};

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelingId, setCancelingId] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    // Kiểm tra đăng nhập, nếu chưa thì chuyển hướng
    const isLoggedIn = Boolean(localStorage.getItem('token'));
    if (!isLoggedIn) {
      alert('Bạn cần đăng nhập để xem các gói đã đặt.');
      navigate('/login');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 500);
  }, [navigate]);

  const handleCancel = (id) => {
    setCancelingId(id);
    // TODO: Gọi API cancelBooking(id)
    setTimeout(() => {
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setCancelingId(null);
    }, 700);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page my-bookings-page" style={{ paddingTop: 80, paddingBottom: 40 }}>
      <div className="container">
        <h1>Gói du lịch đã đặt</h1>
        {loading ? (
          <div className="loading-state">Đang tải...</div>
        ) : bookings.length === 0 ? (
          <div className="empty-state">Bạn chưa đặt gói nào.</div>
        ) : (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Gói</th>
                <th>Tỉnh/Thành</th>
                <th>Giá</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>{b.packageName}</td>
                  <td>{b.province}</td>
                  <td>{formatVnd(b.priceVnd)}</td>
                  <td>{b.createdAt}</td>
                  <td>{b.status}</td>
                  <td>
                    <button className="btn btn-danger" disabled={cancelingId === b._id} onClick={() => handleCancel(b._id)}>
                      {cancelingId === b._id ? 'Đang hủy...' : 'Hủy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="btn btn-secondary" style={{ marginTop: 24 }} onClick={() => navigate(-1)}>← Quay lại</button>
      </div>
    </motion.div>
  );
};

export default MyBookings;
