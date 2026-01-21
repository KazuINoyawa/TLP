const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    const dbName = process.env.MONGO_DB_NAME;
    await mongoose.connect(uri, dbName ? { dbName } : undefined);
    console.log(`MongoDB connected${dbName ? ` (dbName=${dbName})` : ""}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
