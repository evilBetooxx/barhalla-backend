import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true
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

export default mongoose.model("Appointment", appointmentSchema);
