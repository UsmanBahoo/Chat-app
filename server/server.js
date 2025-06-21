const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./database/db');
const cors = require('cors');
const setupSocket = require('./socket');

// controllers
const userController = require('./controllers/UserController');

// routes
const userRoutes = require('./routes/UserRoutes');
const messageRouter = require('./routes/MessageRoutes');
const defaultRouter = require('./routes/defaultRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectDB();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://9c57-2407-...ngrok-free.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.set('io', io);

app.use('/api', userRoutes);
app.use('/api/messages', messageRouter);
app.use('/', defaultRouter);

setupSocket(io);

// ✅ FIXED: correct syntax for root route
app.get('/', (req, res) => {
  res.send('Server Started');
});

// ✅ FIXED: dynamic port for Heroku
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
