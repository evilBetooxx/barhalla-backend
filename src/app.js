import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'
import { config } from 'dotenv';



import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import clientRoutes from "./routes/client.routes.js";
import barbershopRoutes from "./routes/barberShop.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

config();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/barhalla", authRoutes);
app.use("/barhalla", appointmentRoutes);
app.use("/barhalla", clientRoutes);
app.use("/barhalla", barbershopRoutes);
app.use("/barhalla", paymentRoutes);

export default app;
