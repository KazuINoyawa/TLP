const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên địa điểm
  province: { type: String, required: true }, // Tỉnh/thành
  type: { type: String, required: true }, // Loại hình du lịch (biển, núi, di tích, văn hóa...)
  address: { type: String }, // Địa chỉ cụ thể
  geo: {
    lat: { type: Number },
    lng: { type: Number }
  }, // Vị trí địa lý
  description: String, // Mô tả
  images: [String], // Hình ảnh minh họa
  ticketPrice: { type: String }, // Giá vé tham quan
  openTime: { type: String }, // Thời gian mở cửa
  bestTime: { type: String }, // Gợi ý thời điểm du lịch phù hợp
  rating: { type: Number, default: 0 }, // Điểm đánh giá trung bình
  reviewCount: { type: Number, default: 0 }, // Số lượng đánh giá
  isHidden: { type: Boolean, default: false }, // Ẩn khỏi danh sách, chỉ hiện khi tìm kiếm đúng
}, { timestamps: true });

module.exports = mongoose.model("Destination", destinationSchema);
