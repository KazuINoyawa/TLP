import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchDestinations } from '../api/api';

const formatVnd = (value) => {
  try {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  } catch {
    return `${value} VND`;
  }
};

const TravelPackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // Giả lập lấy thông tin gói từ local hoặc API
    const fetchPkg = async () => {
      setLoading(true);
      setError('');
      try {
        // Lấy tất cả địa điểm, tìm gói theo id
        const data = await fetchDestinations({});
        let found = null;
        for (const d of data) {
          const seed = `${d._id || ''}-${d.name || ''}-${d.province || ''}`;
          const pkgs = [
            `${d._id || seed}-basic`,
            `${d._id || seed}-standard`,
            `${d._id || seed}-premium`,
          ];
          if (pkgs.includes(id)) {
            found = {
              ...d,
              pkgId: id,
              tier: id.endsWith('basic') ? 'Tiết kiệm' : id.endsWith('standard') ? 'Tiêu chuẩn' : 'Cao cấp',
            };
            break;
          }
        }
        setPkg(found);
      } catch (e) {
        setError('Không thể tải chi tiết gói.');
      } finally {
        setLoading(false);
      }
    };
    fetchPkg();
  }, [id]);

  if (loading) return <div className="loading-state">Đang tải chi tiết...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!pkg) return <div className="empty-state">Không tìm thấy gói du lịch.</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="page package-detail-page" style={{ paddingTop: 80, paddingBottom: 40 }}>
      <div className="container">
        <button className="btn btn-secondary" onClick={() => navigate(-1)} style={{ marginBottom: 16 }}>← Quay lại</button>
        <h1>{pkg.name} ({pkg.tier})</h1>
        <div><b>Địa điểm:</b> {pkg.name} · {pkg.province}</div>
        <div><b>Loại hình:</b> {pkg.type}</div>
        <div><b>Giá:</b> {formatVnd(pkg.priceVnd)}</div>
        <div><b>Dịch vụ:</b> <ul>{pkg.services?.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
        <div><b>Mô tả:</b> {pkg.description || 'Chưa có mô tả.'}</div>
      </div>
    </motion.div>
  );
};

export default TravelPackageDetail;
