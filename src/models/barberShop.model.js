import mongoose from "mongoose";

const barberShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      city: {
        type: String,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
    },
    services: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    workingDays: {
      days: {
        type: String,
        required: true,
      },
      schedule: {
        type: String,
        required: true,
      },
    },
    contact: {
      phone: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    logo: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
    appointments: [
      { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BarberShop", barberShopSchema);
