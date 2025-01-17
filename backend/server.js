import dotenv from "dotenv";
import authRoutes from "../backend/routes/authRoutes.js";
import messageRoutes from "../backend/routes/messageRoutes.js";
import userRoutes from "../backend/routes/userRoutes.js";
import { connectDb } from "./database/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import express from "express";

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
console.log(PORT);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});

server.listen(PORT, () => {
  connectDb();
  console.log(`Server running at ${PORT}`);
  console.log("hii")
});
