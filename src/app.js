import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import clientRoutes from "./routes/client.routes.js";
import barbershopRoutes from "./routes/barbershop.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
config();   
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/barhalla", authRoutes);
app.use("/barhalla", appointmentRoutes);
app.use("/barhalla", clientRoutes);
app.use("/barhalla", barbershopRoutes);
app.use("/barhalla", paymentRoutes);
app.use("/barhalla", reviewRoutes);

export default app;
