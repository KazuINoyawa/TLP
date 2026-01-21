import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DestinationCard from '../components/DestinationCard';
import { fetchDestinations } from '../api/api';

const PROVINCES = [
  'An Giang', 'Bà Rịa - Vũng Tàu', 'Bạc Liêu', 'Bắc Giang', 'Bắc Kạn', 'Bắc Ninh',
  'Bến Tre', 'Bình Dương', 'Bình Định', 'Bình Phước', 'Bình Thuận', 'Cà Mau',
  'Cao Bằng', 'Cần Thơ', 'Đà Nẵng', 'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai',
  'Đồng Tháp', 'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh', 'Hải Dương',
  'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên', 'Khánh Hòa', 'Kiên Giang',
  'Kon Tum', 'Lai Châu', 'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định',
  'Nghệ An', 'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình', 'Quảng Nam',
  'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng', 'Sơn La', 'Tây Ninh', 'Thái Bình',
  'Thái Nguyên', 'Thanh Hóa', 'Thừa Thiên Huế', 'Tiền Giang', 'TP Hồ Chí Minh',
  'Trà Vinh', 'Tuyên Quang', 'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
];

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('');
  const [type, setType] = useState('');
  const [provinces, setProvinces] = useState(PROVINCES);
  const [loading, setLoading] = useState(false);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.q = search;
      if (province) params.province = province;
      if (type) params.type = type;
      const data = await fetchDestinations(params);
      setDestinations(Array.isArray(data) ? data : []);
      const derived = [...new Set((Array.isArray(data) ? data : []).map(d => d.province).filter(Boolean))];
      setProvinces(Array.from(new Set([...PROVINCES, ...derived])));
    } catch (error) {
      console.error('Error loading destinations:', error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDestinations();
    // eslint-disable-next-line
  }, [search, province, type]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="page destination-list-page"
      style={{ paddingTop: '80px', paddingBottom: '40px' }}
    >
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Danh sách địa điểm du lịch</h1>
          <p className="page-subtitle">Khám phá những địa điểm du lịch tuyệt vời trên khắp Việt Nam</p>
        </div>

        <div className="search-filter-section">
          <SearchBar value={search} onChange={setSearch} onSearch={loadDestinations} />
          <FilterPanel 
            province={province} 
            setProvince={setProvince} 
            type={type} 
            setType={setType} 
            provinces={provinces} 
          />
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang tải địa điểm...</p>
          </div>
        ) : (
          <div id="destinations">
            {destinations.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h3>Không tìm thấy địa điểm phù hợp</h3>
                <p>Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc của bạn</p>
              </div>
            ) : (
              <>
                <p className="results-count">Tìm thấy {destinations.length} địa điểm</p>
                <div className="destinations-grid">
                  {destinations.map(d => (
                    <DestinationCard key={d._id} destination={d} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DestinationList;
