# Hướng dẫn Setup và Chạy Website

## Bước 1: Cài đặt Dependencies

```bash
npm install
```

## Bước 2: Cấu hình môi trường

Tạo file `.env` trong thư mục gốc với nội dung:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/tourism
JWT_SECRET=your-secret-key-here
```

## Bước 3: Chạy ứng dụng

### Cách 1: Development Mode (Khuyên dùng)

Mở 2 terminal:

**Terminal 1 - Chạy Frontend:**
```bash
npm run dev
```
Frontend sẽ chạy tại: http://localhost:5173

**Terminal 2 - Chạy Backend:**
```bash
npm run server:dev
```
Backend API sẽ chạy tại: http://localhost:3000

**Lưu ý:** Trong development mode, truy cập http://localhost:5173 để xem website (Vite sẽ tự động proxy API calls đến backend).

### Cách 2: Production Mode

```bash
# Build frontend
npm run build

# Chạy server (sẽ serve cả frontend và backend)
npm start
```

Truy cập: http://localhost:3000

## Troubleshooting

### Trang trắng khi mở localhost:3000

- Đảm bảo đã chạy `npm run build` trước khi chạy `npm start`
- Kiểm tra console trình duyệt để xem lỗi
- Đảm bảo MongoDB đang chạy nếu có sử dụng database

### Lỗi khi cài đặt dependencies

- Xóa `node_modules` và `package-lock.json`
- Chạy lại `npm install`
