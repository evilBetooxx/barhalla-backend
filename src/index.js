import { app, server, io } from "./app.js";
import { connectDB } from "./db.js";
import { config } from "dotenv";

config();
connectDB();

server.listen(process.env.PORT || 4000, () => {
  console.log("Server on port:", process.env.PORT || 4000);
});
