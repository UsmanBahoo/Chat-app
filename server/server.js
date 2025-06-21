const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./database/db');
const cors = require('cors');
const setupSocket = require('./socket');

// controllers
const userController = require('./controllers/UserController');

//routes
const userRoutes = require('./routes/UserRoutes');
const messageRouter = require('./routes/MessageRoutes');
const defaultRouter = require('./routes/defaultRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


connectDB();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.set('io', io);

const allowedOrigins = [
  'http://localhost:5173', // Vite default
  'http://localhost:3000', // CRA default (if needed)
  'https://9c57-2407-aa80-126-be75-a571-4d02-8a92-365.ngrok-free.app' // <-- Replace with your actual ngrok URL
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use('/api',userRoutes);
app.use('/api/messages',messageRouter)
app.use('/', defaultRouter);

setupSocket(io);

app.get('/', (req, res) => {
  res.send('Server Started');
});


server.listen(5000, () => console.log('Server running on port 5000'));
