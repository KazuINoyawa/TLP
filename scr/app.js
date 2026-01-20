const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/Error_middleware");

const destinationRoutes = require("./routes/Destinations_routes.js");
const reviewRoutes = require("./routes/Review_routes.js");
const itineraryRoutes = require("./routes/Itinerary_routes.js");
const authRoutes = require("./routes/Auth_routes.js");

const path = require("path");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("scr/uploads"));

// Phục vụ file tĩnh cho frontend
app.use(express.static(path.join(__dirname, "../client/src")));

// Route trả về index.html khi truy cập gốc
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../client/src/index.html"));
});

app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
