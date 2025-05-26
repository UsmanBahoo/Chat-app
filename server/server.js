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

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });


connectDB();

app.use(express.json());
app.use(cors({ origin: '*' }));

app.set('io', io);

app.use('/api',userRoutes);
app.use('/api/messages',messageRouter)

setupSocket(io);

server.listen(5000, () => console.log('Server running on port 5000'));
