const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/Error_middleware");

const destinationRoutes = require("./routes/Destinations_routes.js");
const reviewRoutes = require("./routes/Review_routes.js");
const itineraryRoutes = require("./routes/Itinerary_routes.js");
const authRoutes = require("./routes/Auth_routes.js");

const bookingRoutes = require("./routes/Booking_routes.js");

const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);

// Phục vụ file tĩnh cho frontend đã build (production)
const distPath = path.join(__dirname, "../dist");
const fs = require("fs");

// Kiểm tra xem dist folder có tồn tại không
const distExists = fs.existsSync(distPath);

if (distExists) {
	app.use(express.static(distPath));
	
	// Route trả về index.html cho tất cả các route không phải API (SPA routing)
	app.get("*", (req, res) => {
		// Chỉ serve index.html nếu không phải là API route
		if (!req.path.startsWith("/api")) {
			const indexPath = path.join(distPath, "index.html");
			if (fs.existsSync(indexPath)) {
				res.sendFile(indexPath);
			} else {
				res.status(404).send(`
					<h1>Frontend chưa được build</h1>
					<p>Vui lòng chạy: <code>npm run build</code></p>
					<p>Hoặc chạy development mode: <code>npm run dev</code> (truy cập http://localhost:5173)</p>
				`);
			}
		}
	});
} else {
	// Nếu chưa build, hiển thị thông báo hướng dẫn
	app.get("*", (req, res) => {
		if (!req.path.startsWith("/api")) {
			res.status(200).send(`
				<!DOCTYPE html>
				<html lang="vi">
				<head>
					<meta charset="UTF-8">
					<meta name="viewport" content="width=device-width, initial-scale=1.0">
					<title>Hướng dẫn Setup</title>
					<style>
						body {
							font-family: Arial, sans-serif;
							max-width: 800px;
							margin: 50px auto;
							padding: 20px;
							background: #f5f5f5;
						}
						.code {
							background: #333;
							color: #0f0;
							padding: 15px;
							border-radius: 5px;
							font-family: monospace;
							margin: 10px 0;
						}
						h1 { color: #00796b; }
						h2 { color: #004d40; margin-top: 30px; }
					</style>
				</head>
				<body>
					<h1>🚀 Website Tra cứu Du lịch</h1>
					<h2>Frontend chưa được build!</h2>
					<p>Để chạy website, bạn có 2 lựa chọn:</p>
					
					<h2>Lựa chọn 1: Development Mode (Khuyên dùng)</h2>
					<p>Mở 2 terminal và chạy:</p>
					<div class="code">
					Terminal 1: npm run dev<br>
					Terminal 2: npm run server:dev
					</div>
					<p>Sau đó truy cập: <strong>http://localhost:5173</strong></p>
					
					<h2>Lựa chọn 2: Production Mode</h2>
					<p>Chạy các lệnh sau:</p>
					<div class="code">
					npm run build<br>
					npm start
					</div>
					<p>Sau đó truy cập: <strong>http://localhost:3000</strong></p>
					
					<h2>📝 Lưu ý:</h2>
					<p>Đảm bảo đã tạo file <code>.env</code> với nội dung:</p>
					<div class="code">
					PORT=3000<br>
					MONGO_URI=mongodb://localhost:27017/tourism<br>
					JWT_SECRET=your-secret-key-here
					</div>
				</body>
				</html>
			`);
		}
	});
}

app.use(errorHandler);

module.exports = app;
