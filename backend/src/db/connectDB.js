import mongoose from "mongoose";

const connectDB = async() => {
  try {
    let connect = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://iamanshul2211_db_user:anshul9542@cluster0.1dde712.mongodb.net/');
    console.log("MongoDB Database connected successfully");
  } catch (error) {
    console.log("MongoDB error", error);
  }
};

export default connectDB;
