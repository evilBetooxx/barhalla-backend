import mongoose from "mongoose";

export const connectBD = async () => {
  try {
    await mongoose.connect("process.env.MONGODB_URL");
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
