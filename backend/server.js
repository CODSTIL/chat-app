
import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
import dotenv from 'dotenv'
import authRoutes from '../backend/routes/authRoutes.js'
import messageRoutes from '../backend/routes/messageRoutes.js'
import userRoutes from '../backend/routes/userRoutes.js'
import { connectDb } from './database/db.js'
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
app.use(express.json()); // to parse the incoming request with JSON  paylods (from req.body)
app.use(cookieParser());
const server = createServer(app); 
const io = new Server(server);


const PORT = process.env.PORT || 5000;
console.log(PORT);

app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});



io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(PORT, () => {
  connectDb();
  console.log(`Server running at ${PORT}`);
});
