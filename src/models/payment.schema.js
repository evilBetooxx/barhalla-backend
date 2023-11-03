import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
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
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Payment", paymentSchema);
