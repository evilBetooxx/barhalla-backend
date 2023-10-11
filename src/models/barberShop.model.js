import mongoose from "mongoose";

const barberShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: [
      {
        state: {
          type: String,
          required: true
        },
        city: {
          type: String,
          required: true
        },
        street: {
          type: String,
          required: true
        },
      }
    ],
    workingDays: [
      {
        day: {
          type: String,
          required: true
        },
        workingHours: {
          type: String,
          required: true
        }
      }
    ],
    logoImage: {
        type: String,
        required: true
    },
    photos: [
      {
        image: String
      }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("BarberShop", barberShopSchema);
