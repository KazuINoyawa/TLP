# Website Tra cứu Thông tin Du lịch Việt Nam

Website tra cứu thông tin các địa điểm du lịch trong nước.

## Cài đặt

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
Frontend sẽ chạy tại http://localhost:5173

**Terminal 2 - Backend:**
```bash
npm run server:dev
```
Backend API sẽ chạy tại http://localhost:3000

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
