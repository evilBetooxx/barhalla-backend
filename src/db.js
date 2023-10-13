import mongoose from "mongoose";

export const connectDB = async () => {
  const MongoURL = process.env.MONGODB_URL
  try {
    await mongoose.connect(MongoURL);
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
