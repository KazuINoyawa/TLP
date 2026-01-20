import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DestinationCard from '../components/DestinationCard';
import { fetchDestinations } from '../api/api';

const DestinationList = () => {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState('');
  const [province, setProvince] = useState('');
  const [type, setType] = useState('');
  const [provinces, setProvinces] = useState([]);
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
      setProvinces([...new Set((Array.isArray(data) ? data : []).map(d => d.province).filter(Boolean))]);
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
