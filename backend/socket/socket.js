import express from "express";
import { createServer } from "http";

import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getRecieverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("User connected",socket.id);

  const userId = socket.handshake.query.userId;
  if(userId != "undefined") userSocketMap[userId] = socket.id;
  
   io.emit("getOnlineUsers",Object.keys(userSocketMap));

  socket.on("chat-message", (msg) => {
    console.log("message", msg);
  });
  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    console.log("User disconnected");
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  });
});




export { app, server, io };
