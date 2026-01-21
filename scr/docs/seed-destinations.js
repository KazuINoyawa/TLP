require('dotenv').config();
const mongoose = require('mongoose');
const Destination = require('../models/Destination');

const data = [
  {
    name: 'Vịnh Hạ Long',
    province: 'Quảng Ninh',
    type: 'biển',
    address: 'TP Hạ Long, Quảng Ninh',
    description: 'Kỳ quan thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi hùng vĩ.',
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1488482496710-9cd552a21f53?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '290.000đ - 550.000đ/khách (tùy tuyến)',
    openTime: '07:00 - 17:30',
    bestTime: 'Tháng 10 - 4',
    rating: 4.8,
    reviewCount: 1250,
  },
  {
    name: 'Sa Pa',
    province: 'Lào Cai',
    type: 'núi',
    address: 'Sa Pa, Lào Cai',
    description: 'Thị trấn sương mù nổi tiếng với ruộng bậc thang và Fansipan.',
    images: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523528283113-34cb91c99e8b?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Tùy điểm tham quan',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 9-11, 3-5',
    rating: 4.7,
    reviewCount: 980,
  },
  {
    name: 'Bà Nà Hills',
    province: 'Đà Nẵng',
    type: 'giải trí',
    address: 'Hòa Vang, Đà Nẵng',
    description: 'Khu du lịch trên mây với Cầu Vàng nổi tiếng và khí hậu mát mẻ.',
    images: [
      'https://images.unsplash.com/photo-1525275965162-079dfa0d5a9d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526481280695-3c469c2f8d95?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '850.000đ - 950.000đ/khách',
    openTime: '07:00 - 22:00',
    bestTime: 'Quanh năm',
    rating: 4.6,
    reviewCount: 860,
  },
  {
    name: 'Phố cổ Hội An',
    province: 'Quảng Nam',
    type: 'văn hóa',
    address: 'TP Hội An, Quảng Nam',
    description: 'Di sản văn hóa thế giới với kiến trúc cổ và đèn lồng rực rỡ.',
    images: [
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '120.000đ/khách (vé tham quan phố cổ)',
    openTime: '07:00 - 21:00',
    bestTime: 'Tháng 2 - 4, 8 - 10',
    rating: 4.8,
    reviewCount: 1400,
  },
  {
    name: 'Nha Trang',
    province: 'Khánh Hòa',
    type: 'biển',
    address: 'TP Nha Trang, Khánh Hòa',
    description: 'Biển xanh, cát trắng, nhiều đảo đẹp và hoạt động lặn biển.',
    images: [
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Tùy dịch vụ/đảo',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 3 - 8',
    rating: 4.6,
    reviewCount: 1100,
  },
  {
    name: 'Phú Quốc',
    province: 'Kiên Giang',
    type: 'biển',
    address: 'TP Phú Quốc, Kiên Giang',
    description: 'Đảo ngọc với biển xanh, resort và nhiều trải nghiệm ẩm thực, vinwonder.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Tùy điểm tham quan',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 11 - 4',
    rating: 4.7,
    reviewCount: 950,
  },
  {
    name: 'Đà Lạt',
    province: 'Lâm Đồng',
    type: 'núi',
    address: 'TP Đà Lạt, Lâm Đồng',
    description: 'Thành phố ngàn hoa, khí hậu mát mẻ quanh năm, nhiều điểm check-in.',
    images: [
      'https://images.unsplash.com/photo-1526481280695-3c469c2f8d95?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523528283113-34cb91c99e8b?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Tùy điểm tham quan',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 11 - 3',
    rating: 4.7,
    reviewCount: 1230,
  },
  {
    name: 'Tràng An',
    province: 'Ninh Bình',
    type: 'sinh thái',
    address: 'Hoa Lư, Ninh Bình',
    description: 'Quần thể danh thắng với hệ thống núi đá vôi và hang động trên sông.',
    images: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '250.000đ - 300.000đ/khách (thuyền)',
    openTime: '07:00 - 16:00',
    bestTime: 'Tháng 1 - 3, 9 - 11',
    rating: 4.7,
    reviewCount: 870,
  },
  {
    name: 'Phong Nha - Kẻ Bàng',
    province: 'Quảng Bình',
    type: 'hang động',
    address: 'Bố Trạch, Quảng Bình',
    description: 'Di sản thiên nhiên thế giới với hệ thống hang động kỳ vĩ.',
    images: [
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524492412937-4961d66aa114?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '150.000đ - 450.000đ/khách (tùy tuyến)',
    openTime: '07:00 - 17:00',
    bestTime: 'Tháng 3 - 8',
    rating: 4.7,
    reviewCount: 760,
  },
  {
    name: 'Chợ nổi Cái Răng',
    province: 'Cần Thơ',
    type: 'sông nước',
    address: 'Cái Răng, Cần Thơ',
    description: 'Chợ nổi đặc sắc của miền Tây, hoạt động tấp nập từ sáng sớm.',
    images: [
      'https://images.unsplash.com/photo-1523528283113-34cb91c99e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512925762903-07c49d1177c7?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Từ 30.000đ - 70.000đ/khách (thuyền nhỏ)',
    openTime: '05:00 - 09:00',
    bestTime: 'Tháng 6 - 11',
    rating: 4.5,
    reviewCount: 540,
  },
  // Quảng Ninh
  {
    name: 'Bãi Cháy',
    province: 'Quảng Ninh',
    type: 'biển',
    address: 'P. Bãi Cháy, TP Hạ Long, Quảng Ninh',
    description: 'Bãi biển trung tâm Hạ Long, thuận tiện di chuyển và nhiều dịch vụ vui chơi.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Miễn phí, dịch vụ tính riêng',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 4 - 9',
    rating: 4.3,
    reviewCount: 430,
  },
  {
    name: 'Yên Tử',
    province: 'Quảng Ninh',
    type: 'tâm linh',
    address: 'Uông Bí, Quảng Ninh',
    description: 'Khu di tích và danh thắng nổi tiếng, nơi hình thành thiền phái Trúc Lâm Yên Tử.',
    images: [
      'https://images.unsplash.com/photo-1524492412937-4961d66aa114?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Từ 150.000đ/khách (vé cáp treo tuỳ chặng)',
    openTime: '07:00 - 18:00',
    bestTime: 'Tháng 1 - 3 (mùa lễ hội)',
    rating: 4.6,
    reviewCount: 620,
  },
  // Lào Cai
  {
    name: 'Đỉnh Fansipan',
    province: 'Lào Cai',
    type: 'núi',
    address: 'Sa Pa, Lào Cai',
    description: 'Nóc nhà Đông Dương với hệ thống cáp treo hiện đại và quần thể tâm linh trên đỉnh.',
    images: [
      'https://images.unsplash.com/photo-1526481280695-3c469c2f8d95?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '750.000đ - 850.000đ/khách (cáp treo)',
    openTime: '07:00 - 17:00',
    bestTime: 'Tháng 9 - 11',
    rating: 4.8,
    reviewCount: 890,
  },
  {
    name: 'Bản Cát Cát',
    province: 'Lào Cai',
    type: 'bản làng',
    address: 'Xã San Sả Hồ, Sa Pa, Lào Cai',
    description: 'Bản làng người H\'Mông với nhiều góc check-in và trải nghiệm văn hoá bản địa.',
    images: [
      'https://images.unsplash.com/photo-1526481280695-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '70.000đ - 90.000đ/khách',
    openTime: '07:00 - 17:30',
    bestTime: 'Tháng 9 - 4',
    rating: 4.5,
    reviewCount: 510,
  },
  // Đà Nẵng
  {
    name: 'Biển Mỹ Khê',
    province: 'Đà Nẵng',
    type: 'biển',
    address: 'Quận Sơn Trà, Đà Nẵng',
    description: 'Một trong những bãi biển đẹp nhất hành tinh với cát mịn và nước trong xanh.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Miễn phí, dịch vụ tính riêng',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 3 - 9',
    rating: 4.7,
    reviewCount: 980,
  },
  {
    name: 'Ngũ Hành Sơn',
    province: 'Đà Nẵng',
    type: 'tâm linh',
    address: 'Ngũ Hành Sơn, Đà Nẵng',
    description: 'Quần thể núi đá vôi với nhiều chùa chiền và hang động đẹp.',
    images: [
      'https://images.unsplash.com/photo-1524492412937-4961d66aa114?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '40.000đ - 60.000đ/khách',
    openTime: '07:00 - 17:30',
    bestTime: 'Quanh năm',
    rating: 4.4,
    reviewCount: 430,
  },
  // Quảng Nam
  {
    name: 'Rừng dừa Bảy Mẫu',
    province: 'Quảng Nam',
    type: 'sinh thái',
    address: 'Cẩm Thanh, Hội An, Quảng Nam',
    description: 'Trải nghiệm thuyền thúng, nghe hò bài chòi giữa rừng dừa nước xanh mát.',
    images: [
      'https://images.unsplash.com/photo-1512925762903-07c49d1177c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523528283113-34cb91c99e8b?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '150.000đ - 200.000đ/thuyền (2-3 khách)',
    openTime: '07:00 - 17:00',
    bestTime: 'Tháng 2 - 8',
    rating: 4.5,
    reviewCount: 390,
  },
  {
    name: 'Làng gốm Thanh Hà',
    province: 'Quảng Nam',
    type: 'làng nghề',
    address: 'P. Thanh Hà, Hội An, Quảng Nam',
    description: 'Làng nghề truyền thống hơn 500 năm, trải nghiệm nặn gốm và tham quan bảo tàng gốm.',
    images: [
      'https://images.unsplash.com/photo-1524492412937-4961d66aa114?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '35.000đ/khách',
    openTime: '08:00 - 17:00',
    bestTime: 'Tháng 2 - 4, 8 - 10',
    rating: 4.3,
    reviewCount: 260,
  },
  // Khánh Hòa
  {
    name: 'VinWonders Nha Trang',
    province: 'Khánh Hòa',
    type: 'giải trí',
    address: 'Đảo Hòn Tre, TP Nha Trang, Khánh Hòa',
    description: 'Khu vui chơi giải trí lớn với công viên nước, trò chơi mạo hiểm và thuỷ cung.',
    images: [
      'https://images.unsplash.com/photo-1525275965162-079dfa0d5a9d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526481280695-3c469c2f8d95?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '950.000đ - 1.200.000đ/khách',
    openTime: '08:30 - 21:00',
    bestTime: 'Tháng 3 - 9',
    rating: 4.6,
    reviewCount: 720,
  },
  {
    name: 'Đảo Hòn Mun',
    province: 'Khánh Hòa',
    type: 'biển',
    address: 'Vịnh Nha Trang, Khánh Hòa',
    description: 'Điểm lặn biển nổi tiếng với rạn san hô đa dạng và nước trong xanh.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Từ 600.000đ/khách (tour đảo)',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 4 - 9',
    rating: 4.7,
    reviewCount: 510,
  },
  // Kiên Giang (Phú Quốc)
  {
    name: 'Bãi Sao',
    province: 'Kiên Giang',
    type: 'biển',
    address: 'Nam đảo Phú Quốc, Kiên Giang',
    description: 'Bãi biển cát trắng mịn, nước xanh ngọc, nổi tiếng nhất Phú Quốc.',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Miễn phí, dịch vụ tính riêng',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 11 - 4',
    rating: 4.6,
    reviewCount: 640,
  },
  {
    name: 'Grand World Phú Quốc',
    province: 'Kiên Giang',
    type: 'giải trí',
    address: 'Bắc đảo Phú Quốc, Kiên Giang',
    description: 'Thành phố không ngủ với nhiều show diễn, phố đêm và check-in phong cách châu Âu.',
    images: [
      'https://images.unsplash.com/photo-1526481280695-3c469c2f8d95?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Từ 300.000đ/khách (tuỳ show)',
    openTime: 'Cả ngày, nhộn nhịp buổi tối',
    bestTime: 'Quanh năm',
    rating: 4.4,
    reviewCount: 430,
  },
  // Lâm Đồng (Đà Lạt)
  {
    name: 'Núi Langbiang',
    province: 'Lâm Đồng',
    type: 'núi',
    address: 'Lạc Dương, Lâm Đồng',
    description: 'Ngọn núi tượng trưng cho Đà Lạt với view toàn cảnh thành phố và trải nghiệm xe Jeep.',
    images: [
      'https://images.unsplash.com/photo-1526481280695-3c469c2f8d95?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '50.000đ/khách (chưa gồm xe Jeep)',
    openTime: '07:00 - 17:00',
    bestTime: 'Tháng 11 - 3',
    rating: 4.6,
    reviewCount: 580,
  },
  {
    name: 'Thung lũng Tình Yêu',
    province: 'Lâm Đồng',
    type: 'tham quan',
    address: 'TP Đà Lạt, Lâm Đồng',
    description: 'Khu du lịch lãng mạn với hồ nước, đồi thông và nhiều tiểu cảnh chụp hình.',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '250.000đ - 300.000đ/khách',
    openTime: '07:00 - 17:30',
    bestTime: 'Quanh năm',
    rating: 4.4,
    reviewCount: 520,
  },
  // Ninh Bình
  {
    name: 'Tam Cốc - Bích Động',
    province: 'Ninh Bình',
    type: 'sinh thái',
    address: 'Hoa Lư, Ninh Bình',
    description: 'Khu du lịch với trải nghiệm đi thuyền ngắm núi non sông nước và chùa Bích Động.',
    images: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '250.000đ - 300.000đ/khách (thuyền)',
    openTime: '07:00 - 17:00',
    bestTime: 'Tháng 1 - 3',
    rating: 4.6,
    reviewCount: 610,
  },
  {
    name: 'Hang Múa',
    province: 'Ninh Bình',
    type: 'check-in',
    address: 'Hoa Lư, Ninh Bình',
    description: 'Điểm check-in nổi tiếng với 486 bậc thang đá và view toàn cảnh Tam Cốc.',
    images: [
      'https://images.unsplash.com/photo-1526481280695-3c469c2f8d95?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '100.000đ/khách',
    openTime: '06:00 - 19:00',
    bestTime: 'Tháng 4 - 9',
    rating: 4.5,
    reviewCount: 480,
  },
  // Quảng Bình
  {
    name: 'Động Thiên Đường',
    province: 'Quảng Bình',
    type: 'hang động',
    address: 'Bố Trạch, Quảng Bình',
    description: 'Hang động khô dài hàng chục km với hệ thống thạch nhũ lung linh.',
    images: [
      'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524492412937-4961d66aa114?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '250.000đ - 300.000đ/khách',
    openTime: '07:00 - 16:00',
    bestTime: 'Tháng 3 - 8',
    rating: 4.7,
    reviewCount: 540,
  },
  {
    name: 'Sông Chày - Hang Tối',
    province: 'Quảng Bình',
    type: 'mạo hiểm',
    address: 'Bố Trạch, Quảng Bình',
    description: 'Khu du lịch trải nghiệm zipline, tắm bùn và chèo kayak.',
    images: [
      'https://images.unsplash.com/photo-1523528283113-34cb91c99e8b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512925762903-07c49d1177c7?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '450.000đ - 550.000đ/khách',
    openTime: '08:00 - 17:00',
    bestTime: 'Tháng 3 - 8',
    rating: 4.6,
    reviewCount: 420,
  },
  // Cần Thơ
  {
    name: 'Bến Ninh Kiều',
    province: 'Cần Thơ',
    type: 'thành phố',
    address: 'Q. Ninh Kiều, Cần Thơ',
    description: 'Biểu tượng của Cần Thơ với cầu đi bộ, công viên ven sông và du thuyền.',
    images: [
      'https://images.unsplash.com/photo-1512925762903-07c49d1177c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1523528283113-34cb91c99e8b?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: 'Miễn phí, dịch vụ du thuyền tính riêng',
    openTime: 'Cả ngày',
    bestTime: 'Tháng 12 - 4',
    rating: 4.4,
    reviewCount: 530,
  },
  {
    name: 'Nhà cổ Bình Thủy',
    province: 'Cần Thơ',
    type: 'văn hóa',
    address: 'Q. Bình Thủy, Cần Thơ',
    description: 'Ngôi nhà cổ hơn 100 năm tuổi, kết hợp kiến trúc Đông - Tây độc đáo.',
    images: [
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80',
    ],
    ticketPrice: '20.000đ - 30.000đ/khách',
    openTime: '08:00 - 12:00; 14:00 - 18:00',
    bestTime: 'Quanh năm',
    rating: 4.3,
    reviewCount: 310,
  },
];

async function seed() {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  const dbName = process.env.MONGO_DB_NAME || undefined;
  if (!uri) {
    console.error('❌ MONGO_URI chưa được cấu hình trong .env');
    process.exit(1);
  }

  await mongoose.connect(uri, dbName ? { dbName } : undefined);
  console.log(`✅ Đã kết nối MongoDB${dbName ? ` (dbName=${dbName})` : ''}`);

  let inserted = 0;
  for (const d of data) {
    const updated = await Destination.findOneAndUpdate(
      { name: d.name, province: d.province },
      { $set: d },
      { upsert: true, new: true }
    );
    inserted += 1;
    console.log(`→ Upsert: ${updated.name} (${updated.province})`);
  }

  console.log(`🎉 Hoàn thành seed ${inserted} địa điểm.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
  process.exit(1);
});
