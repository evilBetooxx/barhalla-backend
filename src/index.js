import { server, io } from "./app.js";
import { connectDB } from "./db.js";
import { config } from "dotenv";

config();
connectDB();

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message", (body) => {
    socket.broadcast.emit("message", {
      body,
      from: socket.id.slice(8),
    });
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log("Server on port:", process.env.PORT || 4000);
});
