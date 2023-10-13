import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import clientRoutes from "./routes/client.routes.js";
import barbershopRoutes from "./routes/barbershop.routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/barhalla", authRoutes);
app.use("/barhalla", appointmentRoutes);
app.use("/barhalla", clientRoutes);
app.use("/barhalla", barbershopRoutes);

export default app;
