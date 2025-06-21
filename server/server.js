const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./database/db');
const cors = require('cors');
const setupSocket = require('./socket');

const userRoutes = require('./routes/UserRoutes');
const messageRouter = require('./routes/MessageRoutes');
const defaultRouter = require('./routes/defaultRoute');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

connectDB();

app.use(express.json());

// ✅ Allow any origin, no credentials
app.use(cors({ origin: '*' }));

app.set('io', io);

app.use('/api', userRoutes);
app.use('/api/messages', messageRouter);
app.use('/', defaultRouter);

setupSocket(io);

app.get('/', (req, res) => {
  res.send('Server Started');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
