import mongoose from "mongoose";
import env from "dotenv";
env.config();

const connectToDB = async () => {
  try {
    const URI = process.env.MONGODB_URL || 'mongodb://localhost:27017/enews';
    await mongoose.connect(URI);
    console.log("Connection created successfully with MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

export default connectToDB;