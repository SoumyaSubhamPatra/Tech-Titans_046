const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv').config();

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/room', require('./routes/roomRoutes'));
app.use('/api/video', require('./routes/videoRoutes'));

const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: '*' }
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinRoom', ({ roomId, userId }) => {
        socket.join(roomId);
        io.to(roomId).emit('message', `${userId} has joined the room`);
    });

    socket.on('sendMessage', ({ roomId, userId, message }) => {
        io.to(roomId).emit('message', { message });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
