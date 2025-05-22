const Message = require('./models/Message');

function setupSocket(io) {
  // Map to track userId <-> socket.id
  const userSocketMap = {};

  io.on('connection', (socket) => {
    // When a user connects, they should send their userId
    socket.on('register-user', (userId) => {
      userSocketMap[userId] = socket.id;
      socket.join(userId); // Join a room named after the userId
    });

    // Join group rooms
    socket.on('join-group', (groupId) => {
      socket.join(groupId);
    });

    // Personal message
    socket.on('send-message', async (msg) => {
      const saved = await Message.create(msg);

      if (msg.type === 'group' && msg.groupId) {
        io.to(msg.groupId).emit('receive-message', saved);
      } else if (msg.type === 'personal' && msg.to) {
        // Emit only to sender and receiver rooms
        io.to(msg.to).to(msg.sender).emit('receive-message', saved);
      }
    });

    // Clean up on disconnect
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