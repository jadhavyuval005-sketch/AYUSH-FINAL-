import mongoose from "mongoose";

let cachedConnection = globalThis.__ayushMongoConnection;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not set.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = mongoose.connect(uri);
    globalThis.__ayushMongoConnection = cachedConnection;

    await cachedConnection;
    console.log("MongoDB connected.");

    return cachedConnection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    cachedConnection = null;
    globalThis.__ayushMongoConnection = null;
    throw error;
  }
};

export default connectDB;