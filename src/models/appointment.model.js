import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    clientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
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