const express = require("express");
const cors = require("cors");
const errorHandler = require("./middlewares/Error_middleware");

const destinationRoutes = require("./routes/destination.routes");
const reviewRoutes = require("./routes/review.routes");
const itineraryRoutes = require("./routes/itinerary.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("src/uploads"));

app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/itineraries", itineraryRoutes);
app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
