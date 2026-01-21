# Website Tra cứu Thông tin Du lịch Việt Nam
- **Môn học:** QUẢN TRỊ DỰ ÁN CÔNG NGHỆ THÔNG TIN
- **Tên dự án:** WEBSITE TRA CỨU THÔNG TIN DU LỊCH TRONG NƯỚC
- **Thời gian thực hiện:** 6 Weeks

## 2. Thành viên nhóm

| STT | Họ và tên | MSSV |
|----|-----------|------|
| 1 | Huỳnh Lương Chí Dũng | 23050130 |
| 2 | Nguyễn Thành Đồng | 23050158 |
| 3 | Trương Duy Thành Đạt | 23050165 |
| 4 | Nguyễn Thái Anh | 23050180 |

---
## Hướng dẫn cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` trong thư mục gốc với các biến môi trường cần thiết (ví dụ: MongoDB connection string, JWT secret, etc.)

3. Build frontend:
```bash
npm run build
```

## Chạy ứng dụng

### Development Mode

Chạy frontend (Vite dev server) và backend riêng biệt:

**Terminal 1 - Frontend:**
```bash
npm run dev
```
**Terminal 2 - Backend:**
```bash
npm run server:dev
```
### Production Mode

Sau khi build frontend, chạy server:
```bash
npm run build
npm start
```
Ứng dụng sẽ chạy tại http://localhost:3000

## Cấu trúc dự án

- `client/src/` - Frontend React application
- `scr/` - Backend Express server
  - `controllers/` - Route controllers
  - `models/` - MongoDB models
  - `routes/` - API routes
  - `middlewares/` - Express middlewares
  - `config/` - Configuration files

## Tính năng

- Tra cứu địa điểm du lịch
- Tìm kiếm và lọc theo tỉnh/thành, loại hình
- Xem chi tiết địa điểm
- Xem lịch trình gợi ý
- Xem và thêm đánh giá
- Đăng ký/Đăng nhập (đang phát triển)

## Version: v1.1.1
