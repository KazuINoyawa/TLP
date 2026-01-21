import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchDestinations } from '../api/api';
import TravelPackageCard from '../components/TravelPackageCard';

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

const pick = (arr, n, seed) => {
  const out = [];
  for (let i = 0; i < n; i++) out.push(arr[(seed + i) % arr.length]);
  return out;
};

const hashStr = (s) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

const buildPackagesForDestination = (d) => {
  const seed = hashStr(`${d?._id || ''}-${d?.name || ''}-${d?.province || ''}`);
  const baseImages = (d?.images?.length ? d.images : [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
  ]);

  const travelType = d?.type || 'khám phá';
  const province = d?.province || 'Việt Nam';
  const destinationName = d?.name || 'Địa điểm';

  const servicePool = [
    'Xe đưa đón (2 chiều)',
    'Khách sạn 3★ / homestay',
    'Hướng dẫn viên',
    'Vé tham quan',
    'Bảo hiểm du lịch',
    'Bữa ăn theo chương trình',
    'Nước suối + khăn lạnh',
    'Check-in chụp ảnh',
  ];

  const durations = ['2N1Đ', '3N2Đ', '4N3Đ'];
  const peopleOptions = [2, 4, 6, 8];
  const tier = seed % 3; // 0: tiết kiệm, 1: tiêu chuẩn, 2: cao cấp

  const basePrice =
    (tier === 0 ? 1690000 : tier === 1 ? 2590000 : 3990000) +
    ((seed % 7) * 150000);

  const pkgs = [
    {
      id: `${d._id || seed}-basic`,
      destinationId: d._id,
      destinationName,
      province,
      name: `Gói ${destinationName} - Tiết kiệm`,
      priceVnd: Math.max(990000, basePrice - 600000),
      duration: durations[(seed + 0) % durations.length],
      people: peopleOptions[(seed + 1) % peopleOptions.length],
      travelType,
      services: pick(servicePool, 5, seed),
      images: pick(baseImages, Math.min(3, baseImages.length), seed),
    },
    {
      id: `${d._id || seed}-standard`,
      destinationId: d._id,
      destinationName,
      province,
      name: `Gói ${destinationName} - Tiêu chuẩn`,
      priceVnd: basePrice,
      duration: durations[(seed + 1) % durations.length],
      people: peopleOptions[(seed + 2) % peopleOptions.length],
      travelType,
      services: pick(servicePool, 6, seed + 3),
      images: pick(baseImages, Math.min(3, baseImages.length), seed + 1),
    },
    {
      id: `${d._id || seed}-premium`,
      destinationId: d._id,
      destinationName,
      province,
      name: `Gói ${destinationName} - Cao cấp`,
      priceVnd: basePrice + 1200000,
      duration: durations[(seed + 2) % durations.length],
      people: peopleOptions[(seed + 3) % peopleOptions.length],
      travelType,
      services: pick(servicePool, 7, seed + 6),
      images: pick(baseImages, Math.min(3, baseImages.length), seed + 2),
    },
  ];

  return pkgs;
};

const TravelPackages = () => {
  const [query, setQuery] = useState('');
  const [province, setProvince] = useState('');
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchDestinations({});
        setDestinations(Array.isArray(data) ? data : []);
      } catch (e) {
        setError('Không thể tải danh sách địa điểm. Vui lòng thử lại.');
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredDestinations = useMemo(() => {
    const q = query.trim().toLowerCase();
    return destinations.filter((d) => {
      const name = (d?.name || '').toLowerCase();
      const p = (d?.province || '').toLowerCase();
      const type = (d?.type || '').toLowerCase();
      const matchQuery = !q || name.includes(q) || p.includes(q) || type.includes(q);
      const matchProvince = !province || p === province.toLowerCase();
      return matchQuery && matchProvince;
    });
  }, [destinations, query, province]);

  const packages = useMemo(() => {
    return filteredDestinations.flatMap((d) => buildPackagesForDestination(d));
  }, [filteredDestinations]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="page packages-page"
      style={{ paddingTop: '80px', paddingBottom: '40px' }}
    >
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Gói du lịch</h1>
          <p className="page-subtitle">
            Tìm gói theo địa điểm (tên/tỉnh/loại hình). Mỗi địa điểm có nhiều gói với đầy đủ chi tiết.
          </p>
        </div>

        <div className="packages-toolbar">
          <div className="packages-search">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ví dụ: Đà Nẵng / Quảng Ninh / biển / núi..."
              aria-label="Tìm kiếm gói theo địa điểm"
            />
            <select
              className="packages-select"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              aria-label="Chọn tỉnh/thành"
            >
              <option value="">Tất cả tỉnh/thành</option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <button className="btn btn-primary" type="button" onClick={() => setQuery(query.trim())}>
              Tìm
            </button>
          </div>
          <div className="packages-stats">
            {loading ? 'Đang tải...' : `${packages.length} gói · ${filteredDestinations.length} địa điểm`}
          </div>
        </div>

        {error && (
          <div className="error-message" style={{ marginTop: 16 }}>
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Đang tải gói du lịch...</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🧳</div>
            <h3>Chưa có gói phù hợp</h3>
            <p>Thử đổi từ khóa tìm kiếm hoặc kiểm tra dữ liệu địa điểm.</p>
          </div>
        ) : (
          <div className="pkg-grid">
            {packages.map((p) => (
              <TravelPackageCard key={p.id} pkg={p} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TravelPackages;
