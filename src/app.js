import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { Server as SocketServer } from "socket.io";
import http from "http";

import authRoutes from "./routes/auth.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import clientRoutes from "./routes/client.routes.js";
import barbershopRoutes from "./routes/barbershop.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import reviewRoutes from "./routes/review.routes.js";

config();
const app = express();
const server = http.createServer(app);
const io = new SocketServer(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  },
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/barhalla", authRoutes);
app.use("/barhalla", appointmentRoutes);
app.use("/barhalla", clientRoutes);
app.use("/barhalla", barbershopRoutes);
app.use("/barhalla", paymentRoutes);
app.use("/barhalla", reviewRoutes);

io.on("connection", (socket) => {
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(8),
    });
  });
});

export { server, io, app };
