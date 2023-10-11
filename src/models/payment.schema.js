import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model("Payment", paymentSchema);
