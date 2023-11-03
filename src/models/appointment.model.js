import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  
  {
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
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
    paymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Appointment", appointmentSchema);
