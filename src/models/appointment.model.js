import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true
    },
    barberShopID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BarberShop",
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Appointment", appointmentSchema);
