const MessageController = require('./controllers/MessageController.js');

function setupSocket(io) {
  const userSocketMap = {};

  io.on('connection', (socket) => {
    console.log('New socket connection:', socket.id);    
    socket.on('register-user', (userId) => {
      userSocketMap[userId] = socket.id;
      socket.join(userId);
      console.log('User registered:', userId);
    });

    socket.on('join-group', (groupId) => {
      socket.join(groupId);
    });

    socket.on('send-message', async (msg) => {
      console.log('Received message:', msg);
      const saved = await MessageController.createMessageSocket(msg);

      if (msg.type === 'group' && msg.groupId) {
        io.to(msg.groupId).emit('receive-group-message', saved);
      } else if (msg.type === 'personal' && msg.to) {
        
        io.to(msg.to).to(msg.sender).emit('receive-private-message', saved);
      }
    });

    socket.on('disconnect', () => {
      for (const [userId, id] of Object.entries(userSocketMap)) {
        if (id === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
    });
  });
}

module.exports = setupSocket;