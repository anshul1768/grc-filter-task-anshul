import mongoose from "mongoose";

const connectDB = async() => {
  try {
    let connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Database connected successfully");
  } catch (error) {
    console.log("MongoDB error", error);
  }
};

export default connectDB;
