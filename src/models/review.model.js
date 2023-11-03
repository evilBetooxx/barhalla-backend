import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    barberShopID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BarberShop",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);
